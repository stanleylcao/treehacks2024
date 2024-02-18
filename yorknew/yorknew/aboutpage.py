""" This contains the about page for explanation of the app """

from rxconfig import config
import reflex as rx

import yorknew.components.styles


def aboutcontent():
    return rx.center(
        rx.vstack(
            rx.heading("It's time to train your captioning skills!"),
            rx.text(
                "This website is inspired by the New Yorker comic \
			captioning contest. It's fun for all ages and trains your \
			comedy muscles, but it only happens once a week. We're \
			offering a platform that generalizes this competition to \
			all kinds of images, so people can competitively caption without a care.",
                font_family="adobe-caslon",
                font_size="24px",
            ),
            rx.text(
                "You will be competing against two AI systems, both based on the GPT-4V architecture. So make sure you put in more effort than ChatGPT does ;)",
                font_family="adobe-caslon",
                font_size="24px",
            ),
            rx.text(
                "Made by Brion, Stanley, and Kevin",
                font_family="adobe-caslon",
                font_size="24px",
            ),
            align="center",
            spacing="7",
            # font_size="2em",
            padding="4em",
        ),
        height="75vh",
    )
