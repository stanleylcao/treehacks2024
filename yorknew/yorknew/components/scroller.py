from rxconfig import config
import reflex as rx
from os import listdir
from random import randrange
from typing import List
import yorknew.database as db
from sqlmodel import select

import yorknew.components.styles as styles
import yorknew.database as db

path_to_contest_images = "./assets/contest_images/"


class ratingScroller(rx.State):
    imagelist: List[str] = listdir(path_to_contest_images)
    displist: List[str] = [str(x) for x in range(0, len(imagelist))]

    def get_cur_index(self):
        print("Rating Scroller")
        var = db.State.contest_number_rating
        print(type(var))
        print(var)
        return var

    def set_cur_index(self, val):
        print("Rating Scroller")
        db.State.contest_number_rating = val

    def go_bottom(self):
        self.set_cur_index(0)
        self.go_page()

    def go_down(self):
        self.set_cur_index(max(0, self.get_cur_index() - 1))
        self.go_page()

    def go_up(self):
        self.set_cur_index(min(len(self.imagelist), self.get_cur_index() + 1))
        self.go_page()

    def go_top(self):
        self.set_cur_index(len(self.imagelist))
        self.go_page()

    def go_random(self):
        self.set_cur_index(randrange(len(self.imagelist)))
        self.go_page()

    def go_specific(self, new_value):
        self.set_cur_index(new_value)
        self.go_page()

    def go_page(self):
        print("Going to page", self.cur_index)
        pass

    def debug(self):
        print(self.imagelist)
        print(type(self.imagelist))

class leaderboardScroller(rx.State):
    imagelist: List[str] = listdir(path_to_contest_images)
    displist: List[str] = [str(x) for x in range(0, len(imagelist))]

    def get_cur_index(self):
        print("Leaderboard Scroller")
        return db.State.contest_number_leaderboard._decode()

    def set_cur_index(self, val):
        print("Leaderboard Scroller")
        db.State.contest_number_leaderboard = val

    def go_bottom(self):
        self.set_cur_index(0)
        self.go_page()

    def go_down(self):
        self.set_cur_index(max(0, self.get_cur_index() - 1))
        self.go_page()

    def go_up(self):
        self.set_cur_index(min(len(self.imagelist), self.get_cur_index() + 1))
        self.go_page()

    def go_top(self):
        self.set_cur_index(len(self.imagelist))
        self.go_page()

    def go_random(self):
        self.set_cur_index(randrange(len(self.imagelist)))
        self.go_page()

    def go_specific(self, new_value):
        self.set_cur_index(new_value)
        self.go_page()

    def go_page(self):
        print("Going to page", self.set_cur_index)
        pass

    def debug(self):
        print(self.imagelist)
        print(type(self.imagelist))

def scroller(scrollState):
    return rx.hstack(
        rx.button(
            rx.chakra.icon(tag="arrow_left"),
            on_click=scrollState.go_bottom,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_left"),
            on_click=scrollState.go_down,
        ),
        rx.button(
            rx.chakra.icon(tag="star"),
            on_click=scrollState.go_random,
        ),
        rx.button(
            rx.chakra.icon(tag="chevron_right"),
            on_click=scrollState.go_up,
        ),
        rx.button(
            rx.chakra.icon(tag="arrow_right"),
            on_click=scrollState.go_top,
        ),
        rx.select(
            scrollState.displist,
            placeholder="Current Page #",
            label="Page Number",
            size="2",
            style=styles.headerfontstyle,
            on_change=scrollState.go_specific,
        ),
    )
