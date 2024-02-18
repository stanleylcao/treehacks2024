import asyncio
import base64
import json
import logging
import os
from typing import Any, AsyncGenerator, Coroutine, Iterator, TypeVar, cast
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


load_dotenv()


openai = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
logger = logging.getLogger(__name__)


NUM_FEW_SHOT_EXAMPLES = 5


def image_to_data_uri(image: Image.Image) -> str:
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())

    return f"data:image/jpeg;base64,{img_str.decode('utf-8')}"


@tenacity.retry(
    wait=tenacity.wait_random_exponential(),
    stop=tenacity.stop_after_attempt(10),
    retry=tenacity.retry_if_exception_type(OpenAIError),
    before_sleep=tenacity.before_sleep_log(logger, logging.WARNING),
)
async def _get_caption(df: pd.DataFrame, idx: int) -> tuple[str, set[int]]:
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

    res = await openai.chat.completions.create(
        messages=[
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
        ],
        model="gpt-4-vision-preview",
        temperature=1,
        max_tokens=512,
    )
    assert res.choices[0].message.content is not None
    return res.choices[0].message.content, few_shot_contest_numbers


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
    df: pd.DataFrame, limit: int | None = None
) -> AsyncGenerator[dict[str, Any], None]:
    maximum = len(df) if limit is None else min(limit, len(df))

    async def get_image_caption_pair(df: pd.DataFrame, idx: int) -> dict[str, Any]:
        caption, few_shot_contest_numbers = await _get_caption(df, idx)
        return {
            "contest_number": int(df.iloc[idx].contest_number),
            "params": {},
            "few_shot_contest_numbers": list(few_shot_contest_numbers),
            "caption": caption,
        }

    async for res in gather_with_concurrency_yield(
        *(get_image_caption_pair(df, idx) for idx in range(maximum))
    ):
        yield res


OUTPUT_FILE = "data/gptv_samples.jsonl"
INPUT_FILE = Path(__file__).parent.parent.parent.parent / "comics.pkl"


async def main(limit: int | None = None, output_file: str = OUTPUT_FILE) -> None:
    logging.basicConfig(level=logging.INFO)

    output_path = Path(output_file)
    output_path.parent.mkdir(exist_ok=True, parents=True)

    with INPUT_FILE.open("rb") as f:
        df = pd.read_pickle(f)

    df = df.query('rank == "winner"').head(100)

    logger.info("Loaded %d correct captions", len(df))

    with output_path.open("w") as f:
        async for res in eval_gptv(df, limit=limit):
            json.dump(res, f)
            f.write("\n")


if __name__ == "__main__":
    fire.Fire(main)
