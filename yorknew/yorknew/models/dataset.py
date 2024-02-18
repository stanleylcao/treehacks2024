# %%
from io import BytesIO
from datasets import load_dataset, DatasetDict
from PIL import Image
import pandas as pd


dataset = load_dataset("jmhessel/newyorker_caption_contest", "ranking")
assert isinstance(dataset, DatasetDict)

# %%

df = dataset["validation"].to_pandas()
assert isinstance(df, pd.DataFrame)
df["image"] = df["image"].apply(lambda x: Image.open(BytesIO(x["bytes"])))  # type: ignore
