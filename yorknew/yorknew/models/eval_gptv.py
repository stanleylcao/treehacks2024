import asyncio
import base64
import json
import logging
import os
from typing import (
    Any,
    AsyncGenerator,
    Coroutine,
    Iterator,
    Literal,
    TypeVar,
    TypedDict,
    cast,
)
from openai import AsyncOpenAI
from openai import OpenAIError
from openai.types.chat import ChatCompletionMessageParam
from dotenv import load_dotenv
import pandas as pd
from PIL import Image
from io import BytesIO
from more_itertools import flatten
import tenacity
from pathlib import Path
from tqdm.asyncio import tqdm_asyncio
import fire
from typing import assert_never


load_dotenv()


openai = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
logger = logging.getLogger(__name__)


Mode = Literal["few-shot", "cot1"]


NUM_FEW_SHOT_EXAMPLES = 5


def image_to_data_uri(image: Image.Image) -> str:
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())

    return f"data:image/jpeg;base64,{img_str.decode('utf-8')}"


class CaptioningCompletion(TypedDict):
    caption: str
    prompt: list[ChatCompletionMessageParam]
    full_completion: str
    few_shot_contest_numbers: list[int]


SYSTEM_PROMPT = "You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nKnowledge cutoff: 2023-04\nCurrent date: 2024-02-17"
COT_PROMPT = """
Please write an engaging, witty entry for the New Yorker Caption Contest based on this image. You are competing against 5,000 entrants from across the world, many of whom have made hundreds of previous submissions. If you win, you will get an extra $20.

Please follow these rules:

1. First, describe the comic in as much objective detail as you can, subject to a limit of 4 sentences max. Leave no stone unturned and describe all main objects and characters.
2. Then, list as many uncanny aspects of the comic as you can think of (list at least 5. Then, for each one, explain why it is uncanny and why the comic artist likely inserted it. Think about what makes each aspect of the unusual occurrence humorous.
3. Based on your descriptions above and using great taste, come up with 5 potential caption concepts, each of which should be your best work and maximally diverse. Then, roast each one in 2-3 sentences.
4. Write 5 improved concepts after that, explaining why each is better.
""".strip()


@tenacity.retry(
    wait=tenacity.wait_random_exponential(),
    stop=tenacity.stop_after_attempt(10),
    retry=tenacity.retry_if_exception_type(OpenAIError),
    before_sleep=tenacity.before_sleep_log(logger, logging.WARNING),
)
async def _get_caption(mode: Mode, df: pd.DataFrame, idx: int) -> CaptioningCompletion:
    if mode == "few-shot":
        # Compute 5 few-shot examples
        few_shots = df.iloc[[i for i in range(df.shape[0]) if i != idx]].sample(
            n=NUM_FEW_SHOT_EXAMPLES, replace=False
        )
        few_shot_contest_numbers = set(int(i) for i in few_shots.contest_number)
        few_shot_messages: Iterator[ChatCompletionMessageParam] = flatten(
            [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_to_data_uri(cast(Image.Image, entry.image))
                            },
                        }
                    ],
                },
                {
                    "role": "assistant",
                    "content": str(entry.caption),
                },
            ]
            for entry in few_shots.itertuples()
        )

        prompt = [
            {
                "role": "system",
                "content": "Please write a winning caption for these contestants in the New Yorker caption contest.",
            },
            *few_shot_messages,
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": image_to_data_uri(df.iloc[idx].image)},
                    }
                ],
            },
        ]

        res = await openai.chat.completions.create(
            messages=prompt,
            model="gpt-4-vision-preview",
            temperature=1,
            max_tokens=512,
        )
        assert res.choices[0].message.content is not None

        return {
            "caption": res.choices[0].message.content,
            "full_completion": res.choices[0].message.content,
            "prompt": prompt,
            # ensure it's not np.int64
            "few_shot_contest_numbers": list(int(i) for i in few_shot_contest_numbers),
        }
    elif mode == "cot1":
        prompt: list[ChatCompletionMessageParam] = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": image_to_data_uri(df.iloc[idx].image)},
                    },
                    {"type": "text", "text": COT_PROMPT},
                ],
            },
        ]
        res_1 = await openai.chat.completions.create(
            messages=prompt,
            model="gpt-4-vision-preview",
            temperature=1,
            max_tokens=2048,
        )

        assert res_1.choices[0].message.content is not None

        prompt.extend(
            [
                {
                    "role": "assistant",
                    "content": res_1.choices[0].message.content,
                },
                {
                    "role": "user",
                    "content": "Thanks! Now, select the best caption from all the versions you've written above. Write only the caption as a single line, with no other text.",
                },
            ]
        )

        res_2 = await openai.chat.completions.create(
            messages=prompt,
            model="gpt-4-vision-preview",
            temperature=1,
            max_tokens=512,
        )

        assert res_2.choices[0].message.content is not None

        return {
            "caption": res_2.choices[0].message.content,
            "full_completion": res_2.choices[0].message.content,
            "prompt": prompt,
            "few_shot_contest_numbers": [],
        }
    else:
        assert_never(mode)


T = TypeVar("T")


async def gather_with_concurrency_yield(*coros: Coroutine[Any, Any, T], n: int = 10):
    semaphore = asyncio.Semaphore(n)

    async def sem_coro(coro: Coroutine[Any, Any, T]) -> T:
        async with semaphore:
            return await coro

    tasks = [sem_coro(c) for c in coros]

    for task in tqdm_asyncio.as_completed(tasks):
        yield await task


async def eval_gptv(
    mode: Mode, df: pd.DataFrame, limit: int | None = None
) -> AsyncGenerator[dict[str, Any], None]:
    maximum = len(df) if limit is None else min(limit, len(df))

    async def get_image_caption_pair(df: pd.DataFrame, idx: int) -> dict[str, Any]:
        output = await _get_caption(mode, df, idx)
        return {
            "contest_number": int(df.iloc[idx].contest_number),
            "mode": mode,
            "params": {},
            **output,
        }

    async for res in gather_with_concurrency_yield(
        *(get_image_caption_pair(df, idx) for idx in range(maximum))
    ):
        yield res


OUTPUT_FILE = "data/gptv_samples.jsonl"
INPUT_FILE = Path(__file__).parent.parent.parent.parent / "comics.pkl"


async def main(
    mode: Mode, limit: int | None = None, output_file: str = OUTPUT_FILE
) -> None:
    logging.basicConfig(level=logging.INFO)

    output_path = Path(output_file)
    output_path.parent.mkdir(exist_ok=True, parents=True)

    with INPUT_FILE.open("rb") as f:
        df = pd.read_pickle(f)

    df = df.query('rank == "winner"').head(100)

    logger.info("Loaded %d correct captions", len(df))

    with output_path.open("w") as f:
        async for res in eval_gptv(mode, df, limit=limit):
            json.dump(res, f)
            f.write("\n")


if __name__ == "__main__":
    fire.Fire(main)
