# %%
from datasets import load_dataset
import pandas as pd


def get_validation_data():
    dset = load_dataset("jmhessel/newyorker_caption_contest", "ranking")
    pd.set_option("display.max_columns", None)
    pd.set_option("display.max_colwidth", None)
    df = pd.DataFrame(
        {
            "image": dset["validation"]["image"],
            "caption": dset["validation"]["caption_choices"],
            "label": dset["validation"]["label"],
        }
    )
    df_exploded_labels = df.explode("caption").reset_index()
    df_exploded_labels["is_correct"] = df_exploded_labels.groupby(
        "index"
    ).cumcount() == df_exploded_labels["label"].apply(lambda x: 0 if x == "A" else 1)
    df_final = df_exploded_labels.drop(["label", "index"], axis=1).reset_index(
        drop=True
    )
    return df_final


def main():
    get_validation_data()


if __name__ == "__main__":
    main()

# %%

# df = get_validation_data()
# # %%

# df.info()
# # %%

# df.head()
# df.iloc[0]["image"]
