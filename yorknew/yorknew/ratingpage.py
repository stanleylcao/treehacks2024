from rxconfig import config
import reflex as rx

docs_url = "https://reflex.dev/docs/getting-started/introduction"
filename = f"{config.app_name}/{config.app_name}.py"


class State(rx.State):
    """The app state."""

""" This contains the rating page for ease of access to users """
@rx.page()
def index() -> rx.Component:
    return rx.center(
        rx.theme_panel(default_open=False),
        rx.vstack(
            rx.heading("Welcome to Reflex!", size="9"),
            rx.text("Get Started ", rx.code(filename)),
            rx.button(
                "Check out our docs!",
                on_click=lambda: rx.redirect(docs_url),
                size="4",
            ),
            align="center",
            spacing="7",
            font_size="2em",
        ),
        height="100vh",
    )