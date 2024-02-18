# %%

from pathlib import Path
import pandas as pd

from PIL import Image

REFLEX_ROOT_DIR = Path(__file__).parent.parent.parent.parent
DATA_PATH = REFLEX_ROOT_DIR / "data" / "gptv_cot1_samples_100.jsonl"
assert DATA_PATH.exists()
INPUT_FILE = REFLEX_ROOT_DIR.parent / "comics.pkl"
assert INPUT_FILE.exists()

df_gptv = pd.read_json(DATA_PATH, lines=True)
with INPUT_FILE.open("rb") as f:
    df_human = pd.read_pickle(f)

df_human = df_human.query('rank == "winner"').head(100)

df = df_gptv.merge(
    df_human,
    on="contest_number",
    how="left",
    suffixes=("_gptv", "_human"),
    validate="1:1",
)

# %%

for row in df.itertuples():
    # Dump to assets folder
    image_path = (
        REFLEX_ROOT_DIR / "assets" / "contest_images" / f"{row.contest_number}.jpg"
    )

    image: Image.Image = row.image
    with image_path.open("wb") as f:
        image.save(f, format="JPEG")
