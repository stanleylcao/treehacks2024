""" This contains the rating page for ease of access to users """

from rxconfig import config
import reflex as rx

import yorknew.components.styles
from yorknew.components.scroller import scroller
from yorknew.database import State

def ratingscontent():
    return rx.center(
        rx.vstack(
            # Heading
            rx.heading("Rate The Caption for Image (statevar)", size="7"),
            # Image
            rx.image(src="/example_nycomic.webp", width="400px"),
            # Scroller
            scroller(1), # replace with rating_page statevar

            # Submission Form
            rx.form(
                rx.vstack(
                    # Default two choices
                    rx.hstack(
                        rx.button(
                            "Option 1",
                            size="4",
                            type="submit",
                        ),
                        rx.button(
                            "Option 2",
                            size="4",
                            type="submit",
                        ),
                    ),
                    # Custom choice entry
                    rx.text("Don't like either? Write your own!", size="3"),
                    rx.text_area(
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
                # on_submit=FormState.handle_submit,
                reset_on_submit=True,
            ),
            align="center",
            spacing="7",
            font_size="2em",
        ),
        height="100vh",
    )
