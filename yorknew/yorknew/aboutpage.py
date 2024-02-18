""" This contains the about page for explanation of the app """

from rxconfig import config
import reflex as rx

import yorknew.components.styles

def aboutcontent():
    return rx.vstack(
        rx.heading("It's time to train your captioning skills!"),
        rx.text("This website is inspired by the New Yorker comic \
			captioning contest. It's fun for all ages and trains your \
			comedy muscles, but it only happens once a week. We're \
			offering a platform that generalizes this competition to \
			all kinds of images (including AI-generated New Yorker-style \
			panels), so people can competitively captions without a care."),

		align='center',
		spacing="7",
		font_size="2em",
    )