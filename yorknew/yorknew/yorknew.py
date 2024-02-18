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
        appearance="inherit",
        has_background=True,
        radius="large",
        # accent_color="gray",
    ),
    style={
        'accent_color': '#8C1515',
        rx.button: {"font_family": "Merriweather",
                    'transition': 'background-color 0.3s ease, transform 0.3s ease',
                    'background-color': '#2E2D29',
                    '_hover': {
                        'transform': 'scale(1.1)',
                        'background-color': '#8C1515',
                    }
                    },
        rx.text: {"font_family": "Merriweather", 'font_size': '17px'},
        rx.heading: {"font_family": "Merriweather", 'font_size': '35px'},
        # 'font_family': "adobe-caslon",
        'font_family': "Merriweather",
        'font_size': '10px'
        # rx.data_table: {"font_family": "Merriweather", }
    },
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

app.add_page(index)
app.add_page(about)
app.add_page(rankings)