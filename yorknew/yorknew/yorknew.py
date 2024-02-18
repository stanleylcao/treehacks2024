"""This file serves as the starting point for app deployment and nav"""

import logging
from pathlib import Path
import pandas as pd
import reflex as rx

from yorknew.ratingpage import ratingscontent
from yorknew.aboutpage import aboutcontent
from yorknew.leaderboardpage import rankingscontent
import yorknew.database as db

import yorknew.components.navbar as navbar


logger = logging.Logger(__name__)

REFLEX_ROOT_DIR = Path(__file__).parent.parent


app = rx.App(
    stylesheets=[
        "fonts/newyorkertitle.css",
    ],
    theme=rx.theme(
        appearance="light",
        has_background=True,
        radius="large",
        accent_color="orange",
    ),
    style={"font_family": "Libre Caslon Text, serif"},
)


@rx.page(title="Yorknew")
def index() -> rx.Component:
    return rx.fragment(
        navbar.navbar(),
        rx.container(
            ratingscontent(),
            padding_top=navbar.navbar_height,
        ),
    )


@rx.page(title="About Yorknew")
def about() -> rx.Component:
    return rx.fragment(
        navbar.navbar(),
        rx.container(
            aboutcontent(),
            padding_top=navbar.navbar_height,
        ),
    )


@rx.page(title="Yorknew Leaderboard", on_load=db.State.get_leaderboard_table)
def rankings() -> rx.Component:
    return rx.fragment(
        navbar.navbar(),
        rx.container(
            rankingscontent(),
            padding_top=navbar.navbar_height,
        ),
    )


def initialize_database_with_captions():
    print("Initializing database...")
    df = pd.read_csv(REFLEX_ROOT_DIR / "data" / "combined_df.csv")
    added_items = 0
    with rx.session() as session:
        for item in df.itertuples():
            entry = db.Entry(
                subject=item.subject,
                name=item.name,
                caption=item.caption,
                rating=item.rating,
            )
            if not session.exec(db.Entry.select.where(db.Entry.name == item.name)):
                session.add(entry)
                added_items += 1

    print("Database initialized! Added {} missing items".format(added_items))


app.add_page(index)
app.add_page(about)
app.add_page(rankings)


# Initialize the database if it isn't already loaded
initialize_database_with_captions()
