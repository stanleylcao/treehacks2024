from rxconfig import config
import reflex as rx
import yorknew.database as db
from sqlmodel import select

import yorknew.components.styles as styles


def scroller(curpage):
    return rx.hstack(
        rx.button(rx.chakra.icon(tag="arrow_left")),
        rx.button(rx.chakra.icon(tag="chevron_left")),
        rx.button(rx.chakra.icon(tag="star")),
        rx.button(rx.chakra.icon(tag="chevron_right")),
        rx.button(rx.chakra.icon(tag="arrow_right")),
        rx.select(
            [],
            placeholder="Current Page #",
            label="Page Number",
            size="2",
            style=styles.headerfontstyle,
        ),
    )
