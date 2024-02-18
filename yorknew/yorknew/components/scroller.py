from rxconfig import config
import reflex as rx
from os import listdir
from random import randrange
from typing import List
import yorknew.database as db
from sqlmodel import select

import yorknew.components.styles as styles
import yorknew.database as db

path_to_contest_images = "./assets/contest_images/"


def ratingscroller():
    return rx.hstack(
        rx.button(
            rx.chakra.icon(tag="arrow_left"),
            on_click=db.State.go_bottom_rating,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_left"),
            on_click=db.State.go_down_rating,
        ),
        rx.button(
            rx.chakra.icon(tag="star"),
            on_click=db.State.go_random_rating,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_right"),
            on_click=db.State.go_up_rating,
        ),
        rx.button(
            rx.chakra.icon(tag="arrow_right"),
            on_click=db.State.go_top_rating,
        ),
        rx.select(
            db.State.imgidlist,
            placeholder="Current Page #",
            label="Page Number",
            size="2",
            style=styles.headerfontstyle,
            value=db.State.imgidlist[db.State.contest_number_rating],
            on_change=db.State.go_specific_rating,
        ),
    )


def leaderboardscroller():
    return rx.hstack(
        rx.button(
            rx.chakra.icon(tag="arrow_left"),
            on_click=db.State.go_bottom_leaderboard,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_left"),
            on_click=db.State.go_down_leaderboard,
        ),
        rx.button(
            rx.chakra.icon(tag="star"),
            on_click=db.State.go_random_leaderboard,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_right"),
            on_click=db.State.go_up_leaderboard,
        ),
        rx.button(
            rx.chakra.icon(tag="arrow_right"),
            on_click=db.State.go_top_leaderboard,
        ),
        rx.select(
            db.State.imgidlist,
            placeholder="Current Page #",
            label="Page Number",
            size="2",
            style=styles.headerfontstyle,
            value=db.State.imgidlist[db.State.contest_number_leaderboard],
            on_change=db.State.go_specific_leaderboard,
        ),
    )
