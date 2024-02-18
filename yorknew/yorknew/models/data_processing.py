from datasets import load_dataset, DatasetDict
import pandas as pd
import pickle


# type: ignore


def get_val_ranking(num_examples=250):
    dset = load_dataset("jmhessel/newyorker_caption_contest", "ranking")
    assert isinstance(dset, DatasetDict)
    # pd.set_option('display.max_columns', None)
    # pd.set_option('display.max_colwidth', None)
    df = pd.DataFrame(
        {
            "image": dset["validation"]["image"],
            "caption": dset["validation"]["caption_choices"],
            "contest_number": dset["validation"]["contest_number"],
            "label": dset["validation"]["label"],
            "winner_source": dset["validation"]["winner_source"],
        }
    )
    df_exploded_labels = df.explode("caption").reset_index()
    df_exploded_labels["is_correct"] = df_exploded_labels.groupby(
        "index"
    ).cumcount() == df_exploded_labels["label"].apply(lambda x: 0 if x == "A" else 1)
    df_final = df_exploded_labels.drop(["label", "index"], axis=1).reset_index(
        drop=True
    )

    df_final = df_final[df_final["winner_source"] == "official_winner"]
    df_final["rank"] = df_final["is_correct"].replace(
        {True: "finalist", False: "bad"})

    df_final.to_csv("./val_ranking.csv")
    # print(df_final.iloc[:num_examples])
    return df_final


def get_val_explanation():
    dset = load_dataset("jmhessel/newyorker_caption_contest", "explanation")
    assert isinstance(dset, DatasetDict)

    df = pd.DataFrame(
        {
            "image": dset["validation"]["image"],
            "caption": dset["validation"]["caption_choices"],
            "contest_number": dset["validation"]["contest_number"],
            "from_description": dset["validation"]["from_description"],
            "image_description": dset["validation"]["image_description"],
            "image_location": dset["validation"]["image_location"],
            "image_uncanny_description": dset["validation"][
                "image_uncanny_description"
            ],
            "explanation": dset["validation"]["label"],
            "questions": dset["validation"]["questions"],
        }
    )
    df["rank"] = "winner"
    df.to_csv("./val_explanation.csv")

    return df


def main():
    df_ranking = get_val_ranking()
    df_explan = get_val_explanation()
    df_final = df_ranking.merge(
        df_explan, on=["contest_number", "caption"], how="left")
    df_final.loc[df_final["rank_y"].notnull(), "rank_x"] = df_final["rank_y"]
    df_final.drop(
        ["rank_y", "image_y", "is_correct", "winner_source"], axis=1, inplace=True
    )
    df_final.rename(columns={"rank_x": "rank",
                    "image_x": "image"}, inplace=True)

    # print(df_final['image'].iloc[0].show())
    df_final.to_pickle("./comics.pkl")
    # df_final.to_parquet('./comics.gzip')
    # df_final.to_csv('./comics.csv')


if __name__ == "__main__":
    main()
