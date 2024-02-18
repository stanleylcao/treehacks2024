""" This contains the rating page for ease of access to users """

from rxconfig import config
import reflex as rx

from yorknew.components.scroller import ratingscroller
import yorknew.database as db


def ratingscontent():
    return rx.center(
        rx.vstack(
            # Heading
            rx.heading(
                f"Contest #{db.State.imgidlist[db.State.contest_number_rating]}", size="7"),
            rx.text(
                "Vote for your favorite caption.", size="7", font_family="adobe-caslon"
            ),
            # Image
            rx.image(
                src=f"/contest_images/{db.State.imgidlist[db.State.contest_number_rating]}.jpg", height="33vh"),
            # Scroller
            ratingscroller(),  # replace with rating_page statevar
            # Default two choices
            rx.cond(
                db.State.caption_1,
                rx.hstack(
                    rx.button(
                        db.State.caption_1.caption,
                        width="400px",  # Fixed width
                        height="100px",
                        font_size="20px",
                        padding="10px",
                        font_family="adobe-caslon",
                        overflow="hidden",
                        type="submit",
                        on_click=db.State.button_1_click,
                        style={'text-align': 'center'}
                    ),
                    rx.button(
                        db.State.caption_2.caption,
                        width="400px",  # Fixed width
                        height="100px",
                        font_size="20px",
                        padding="10px",
                        font_family="adobe-caslon",
                        type="submit",
                        on_click=db.State.button_2_click,
                        style={'text-align': 'center'}
                    ),
                ),
            ),
            rx.form(
                rx.vstack(
                    # Custom choice entry
                    rx.text("Don't like either? Write your own!", size="3"),
                    rx.hstack(
                        rx.input(
                            name="new_name",
                            placeholder="My leaderboard name...",
                            style={"width": "200px", "height": "50px"},
                        ),
                        rx.input(
                            name="new_caption",
                            placeholder="My superior caption...",
                            style={"width": "400px", "height": "50px"},
                        ),
                        rx.button(
                            "Submit my caption",
                            size="4",
                            type="submit",
                        ),
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
        margin_top="10em",
    )
