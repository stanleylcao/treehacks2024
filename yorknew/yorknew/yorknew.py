"""This file serves as the starting point for app deployment and nav"""

from rxconfig import config
import reflex as rx

from yorknew.ratingpage import ratingscontent
from yorknew.aboutpage import aboutcontent
from yorknew.rankingpage import rankingscontent

import yorknew.components.navbar as navbar

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

@rx.page(title="Yorknew Leaderboard")
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
