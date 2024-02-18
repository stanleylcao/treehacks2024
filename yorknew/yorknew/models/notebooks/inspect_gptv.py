# %%

from pathlib import Path
import pandas as pd

DATA_PATH = (
    Path(__file__).parent.parent.parent.parent / "data" / "gptv_cot1_samples_10.jsonl"
)
assert DATA_PATH.exists()
INPUT_FILE = Path(__file__).parent.parent.parent.parent.parent / "comics.pkl"
assert INPUT_FILE.exists()

df_gptv = pd.read_json(DATA_PATH, lines=True)
with INPUT_FILE.open("rb") as f:
    df_human = pd.read_pickle(f)

df_human = df_human.query('rank == "winner"').head(100)

df_gptv.info()
df_human.info()

df = df_gptv.merge(
    df_human, on="contest_number", how="left", suffixes=("_gptv", "_human")
)

# %%

df = df.rename(
    columns={
        "caption_gptv": "caption_a",
        "caption_human": "caption_b",
    }
)

# %%

for i, row in df.iterrows():
    display(row["image"])
    print("A:", row["caption_a"].replace('"', ""))
    print("B:", row["caption_b"])
    print()
    if i == 5:
        break
