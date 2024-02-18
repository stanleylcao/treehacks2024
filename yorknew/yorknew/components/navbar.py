from rxconfig import config
import reflex as rx

import yorknew.components.styles as styles

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
        position="fixed",
        top="0px",
        background_color="lightgray",
        padding="1em",
        height="4em",
        width="100%",
        z_index="5",
    )
