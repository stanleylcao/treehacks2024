from rxconfig import config
import reflex as rx

import yorknew.components.styles as styles
import yorknew.database as db

navbar_height = "6em"


def navbar():
    return rx.hstack(
        rx.image(src="/eustace-400.webp", width="2em"),
        rx.spacer(),
        rx.heading(
            "YORKNEW",
            font_family="NYTitleFont",
            font_size="2em",
            position="absolute",
            left="0%",
            right="0%",
            text_align="center",
            zIndex="-1",
        ),
        rx.button(
            rx.chakra.icon(tag="question"),
            "About",
            on_click=rx.redirect("/about"),
            style={"font_family": "Libre Caslon Text"},
        ),
        rx.button(
            rx.chakra.icon(tag="plus_square"),
            "Rating",
            on_click=rx.redirect("/"),
        ),
        rx.button(
            rx.chakra.icon(tag="view"),
            "Leaderboard",
            on_click=rx.redirect("/rankings"),
        ),
        rx.button(
            rx.chakra.icon(tag="view"),
            "CLEAR",
            on_click=db.State.clear_db,
        ),
        position="fixed",
        top="0px",
        border_bottom="1px solid rgb(229, 229, 229)",
        background_color="white",
        padding="1em",
        height="4em",
        width="100%",
        z_index="5",
    )
