# %%

from pathlib import Path
import pandas as pd

REFLEX_ROOT_DIR = Path(__file__).parent.parent.parent.parent
MODEL_COT_PATH = REFLEX_ROOT_DIR / "data" / "gptv_cot1_samples_100.jsonl"
MODEL_FEWSHOT_PATH = REFLEX_ROOT_DIR / "data" / "gptv_samples.jsonl"
INPUT_FILE = REFLEX_ROOT_DIR.parent / "comics.pkl"

for file in [MODEL_COT_PATH, MODEL_FEWSHOT_PATH, INPUT_FILE]:
    assert file.exists()

df_cot = pd.read_json(MODEL_COT_PATH, lines=True)
df_fewshot = pd.read_json(MODEL_FEWSHOT_PATH, lines=True)
with INPUT_FILE.open("rb") as f:
    df_human = pd.read_pickle(f)

df_human = df_human.query('rank == "winner"').head(100)

COLUMNS = ["subject", "name", "caption", "rating"]

# Convert into a format similar to the database: subject | name | caption | rating
df_for_db = pd.concat(
    [
        df_cot.assign(subject="GPT-4V (complex CoT)", rating=0).rename(
            columns={
                "contest_number": "name",
            }
        )[COLUMNS],
        df_fewshot.assign(subject="GPT-4V (few-shot)", rating=0).rename(
            columns={
                "contest_number": "name",
            }
        )[COLUMNS],
        df_human.assign(subject="New Yorker winner", rating=0).rename(
            columns={
                "contest_number": "name",
            }
        )[COLUMNS],
    ]
)

df_for_db.info()

# %%

df_for_db.to_csv(REFLEX_ROOT_DIR / "data/combined_df.csv", index=False)
