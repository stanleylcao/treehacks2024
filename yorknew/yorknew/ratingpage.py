""" This contains the rating page for ease of access to users """

from rxconfig import config
import reflex as rx

import yorknew.components.styles
from yorknew.components.scroller import ratingscroller
import yorknew.database as db


def ratingscontent():
    return rx.center(
        rx.vstack(
            # Heading
            rx.heading(
                f"Rate The Caption for Image \
                {db.State.contest_number_rating}",
                size="7",
            ),
            # Image
            rx.image(
                src=f"/contest_images/{db.State.imagelist [db.State.contest_number_rating - 1]}", height="200px"),
            # Scroller
            ratingscroller(),  # replace with rating_page statevar
            # Default two choices
            rx.hstack(
                rx.button(
                    db.State.caption_1.caption,
                    size="4",
                    type="submit",
                    # on_click=rx.console_log('NE ADDED')
                    on_click=db.State.button_1_click,
                ),
                rx.button(
                    db.State.caption_2.caption,
                    size="4",
                    type="submit",
                    on_click=db.State.button_2_click,
                ),
            ),
            rx.form(
                rx.vstack(
                    # Custom choice entry
                    rx.text("Don't like either? Write your own!", size="3"),
                    rx.input(
                        name="new_name",
                        placeholder="My leaderboard name...",
                        style={"width": "200px", "height": "50px"},
                    ),
                    rx.input(
                        name="new_caption",
                        placeholder="My superior caption...",
                        style={"width": "300px", "height": "50px"},
                    ),
                    rx.button(
                        "Submit my caption",
                        size="4",
                        type="submit",
                    ),
                    align="center",
                ),
                on_submit=db.State.handle_submit,
                reset_on_submit=True,
            ),
            align="center",
            spacing="7",
            font_size="2em",
        ),
        height="100vh",
    )
