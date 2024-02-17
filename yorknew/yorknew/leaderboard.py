from rxconfig import config
import reflex as rx

""" This page contains the rating page for ease of access to users """
@rx.page()
def leaderboard() -> rx.Component:
    return rx.center(
        rx.heading("Leaderboard Page!", size="9"),
    )