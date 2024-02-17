"""This file serves as the starting point for app deployment"""

from rxconfig import config
import reflex as rx

from yorknew.ratingpage import index
from yorknew.aboutpage import about
from yorknew.leaderboard import leaderboard

app = rx.App()
app.add_page(index)
app.add_page(about)
app.add_page(leaderboard)
