import asyncio
import base64
import logging
import os
from typing import Any, Coroutine, Iterator, TypeVar, cast
from openai import AsyncOpenAI
from openai import OpenAIError
from openai.types.chat import ChatCompletionMessageParam
from dotenv import load_dotenv
import datasets
import pandas as pd
from PIL import Image
from io import BytesIO
from more_itertools import flatten
import tenacity
from tqdm import tqdm
from tqdm.asyncio import tqdm_asyncio

from yorknew.models.data_processing import get_validation_data


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
async def _get_caption(df: pd.DataFrame, idx: int) -> str:
    # Compute 5 few-shot examples
    few_shots = df.sample(NUM_FEW_SHOT_EXAMPLES)
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
    return res.choices[0].message.content


T = TypeVar("T")


async def gather_with_concurrency_yield(*coros: Coroutine[Any, Any, T], n: int = 10):
    semaphore = asyncio.Semaphore(n)

    async def sem_coro(coro: Coroutine[Any, Any, T]) -> T:
        async with semaphore:
            return await coro

    tasks = [sem_coro(c) for c in coros]

    for task in tqdm_asyncio.as_completed(tasks):
        yield await task


async def eval_gptv(df: pd.DataFrame, limit: int | None = None) -> None:
    maximum = len(df) if limit is None else min(limit, len(df))

    async def get_image_caption_pair(
        df: pd.DataFrame, idx: int
    ) -> tuple[pd.Series, str]:
        return (
            df.iloc[idx],
            await _get_caption(df, idx),
        )

    async for res in gather_with_concurrency_yield(
        *(get_image_caption_pair(df, idx) for idx in range(maximum))
    ):
        print(res)


async def main() -> None:
    df = get_validation_data()
    df = df.query("is_correct == True")

    await eval_gptv(df.sample(6), limit=1)


if __name__ == "__main__":
    asyncio.run(main())