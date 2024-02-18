# %%
import base64
from dataclasses import dataclass
from io import BytesIO
import logging
from openai import AsyncOpenAI, OpenAIError
import os

import tenacity
from PIL import Image


openai = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])


FEW_SHOT_PROMPT = """
Here are 10 outstanding descriptions of New Yorker comics from the caption contest.

1. scene: a psychiatrist office description: A psychiatrist is having a session in her offce. There is a casket sitting on her couch. uncanny: A casket is taking the place of a patient. entities: Coffin, Customer. caption: Any final thoughts?

2. scene: the side of a building description: Three men are standing out on the ledge of a tall building. They are a priest, police officer, and a fireman. Another man is standing by the window and speaking to them. uncanny: Three people are outside on the ledge of a building together. It is a dangerous place to be and they're not trying to save each other. entities: Firefighter, Police_officer, Bar_joke. caption: Fellas, your empathy for victims is outstanding.

3. scene: an alleyway description: Devils are herding people in the middle of a street. A manhole is open and there is fire below. uncanny: Devils in the middle of a city are pretty out of place, and hell being in the sewers is too. entities: Portal_(architecture), Hell, Manhole. caption: Watch your step, I think this street is paved with Good Intentions.

4. scene: restaurant description: There is a huge anchor in a cafe. People are staring at it. A pirate is the cashier. uncanny: There is a pirate and huge anchor inside a cafe. entities: Pirate, Anchor. caption: There's mutiny in the air. Also Viennese dark roast, but mainly mutiny.

5. scene: a restaurant description: A man and woman is sitting at a dining table with food on the table. Man's head is essentially a blender spinning at high speed and woman is watching that with a confused look. uncanny: Most out of place element is the blender on the man's head. entities: Blender, Dating. caption: Remember when your rubber seal broke? I'm pregnant.

6.
""".strip()


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class CaptionedImage:
    scene_prompt: str
    revised_prompt: str | None
    image: Image.Image


@tenacity.retry(
    wait=tenacity.wait_random_exponential(),
    stop=tenacity.stop_after_attempt(10),
    retry=tenacity.retry_if_exception_type(OpenAIError),
    before_sleep=tenacity.before_sleep_log(logger, logging.WARNING),
)
async def dalle_image() -> CaptionedImage:
    res = await openai.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=FEW_SHOT_PROMPT,
        temperature=1,
        # do not include the caption in the prompt
        stop=["\n", "caption:"],
        max_tokens=512,
    )

    prompt = res.choices[0].text

    print("Got scene prompt: %s", prompt)

    res = await openai.images.generate(
        prompt=f"A simple, not detailled hand-drawn cartoon in the style of The New Yorker. The drawing style should be reminiscent of a minimalist approach, focusing on clean lines, very limited detail, and often monochromatic or subdued color palettes. Include lots of white space surrounding the cartoon itself on all sides. Black and white only. Prompt: {prompt}",
        model="dall-e-3",
        response_format="b64_json",
    )

    b64_json = res.data[0].b64_json
    assert isinstance(b64_json, str)

    return CaptionedImage(
        scene_prompt=prompt,
        revised_prompt=res.data[0].revised_prompt,
        image=Image.open(BytesIO(base64.b64decode(b64_json))),
    )
