from rxconfig import config
import reflex as rx

""" This contains the about page for explanation of the app """
@rx.page()
def about() -> rx.Component:
    return rx.center(
        rx.heading("Leaderboard Page!", size="9"),
    )