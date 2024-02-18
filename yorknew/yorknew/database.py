import reflex as rx
from yorknew.ELO import adjust_rating
from sqlmodel import Session
from os import listdir
from typing import List
from random import randrange

import random

path_to_contest_images = "./assets/contest_images/"
entrycolumns = ["Rating", "User", "Caption"]

columns: list[dict[str, str]] = [
    {
        "title": "Rating",
        "type": "int",
    },
    {
        "title": "User",
        "type": "string",
    },
    {
        "title": "Caption",
        "type": "string",
    },
]

# Database for the rankings of each caption


class Entry(rx.Model, table=True):
    subject: int
    name: str
    caption: str
    rating: int


# State for updating the current panel being observed


class State(rx.State):
    imagelist: List[str] = listdir(path_to_contest_images)
    displist: List[str] = [str(x) for x in range(0, len(imagelist))]

    contest_number_leaderboard: int = 5
    contest_number_rating: int = 0

    # For leaderboard display
    leaderboard_table: list[list]

    # For rating page
    caption_1: Entry = None
    caption_2: Entry = None

    @staticmethod
    def convert_entry_to_list(entry) -> tuple[int, str, str]:
        return [entry.rating, entry.name, entry.caption]

    def get_leaderboard_table(self):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == self.contest_number_leaderboard)
            )
            self.leaderboard_table = list(
                map(State.convert_entry_to_list, entry_list))

    def clear_db(self):
        with rx.session() as session:
            entry_list = session.exec(Entry.select.where(True))
            for e in entry_list:
                session.delete(e)
            session.commit()

    def load_two_captions_to_rate(self):
        with rx.session() as session:
            entry_list = list(
                session.exec(
                    Entry.select.where(
                        Entry.subject == self.contest_number_rating)
                )
            )
            if len(entry_list) >= 2:
                self.caption_1, self.caption_2 = random.sample(entry_list, 2)
            else:
                self.caption_1, self.caption_2 = '', ''

    def update_captions_rating(
        self, session: Session, caption_1_new_r: int, caption_2_new_r: int
    ) -> None:
        self.caption_1.rating = caption_1_new_r
        session.add(self.caption_1)
        self.caption_2.rating = caption_2_new_r
        session.add(self.caption_2)

    def add_new_caption(self, session, subject, name, caption):
        print(f"subject = {subject}, {name}, {caption}")
        session.add(
            Entry(
                subject=subject,
                name=name,
                caption=caption,
                rating=0,
            )
        )

    # Scrolling callbacks for Rating Page

    def go_bottom_rating(self):
        return self.go_page_rating(0)

    def go_down_rating(self):
        new_value = max(0, self.contest_number_rating - 1)
        self.go_page_rating(new_value)

    def go_up_rating(self):
        new_value = min(len(self.imagelist) - 1,
                        self.contest_number_rating + 1)
        self.go_page_rating(new_value)

    def go_top_rating(self):
        new_value = len(self.imagelist) - 1
        self.go_page_rating(new_value)

    def go_random_rating(self):
        new_value = randrange(len(self.imagelist) - 1)
        self.go_page_rating(new_value)

    def go_specific_rating(self, new_value):
        self.go_page_rating(new_value)

    def go_page_rating(self, new_value):
        self.contest_number_rating = new_value
        self.load_two_captions_to_rate()
        print("Rating going to page", new_value)

    # Scrolling callbacks for Leaderboard Page

    def go_bottom_leaderboard(self):
        return self.go_page_leaderboard(0)

    def go_down_leaderboard(self):
        new_value = max(0, self.contest_number_leaderboard - 1)
        self.go_page_leaderboard(new_value)

    def go_up_leaderboard(self):
        new_value = min(len(self.imagelist) - 1,
                        self.contest_number_leaderboard + 1)
        self.go_page_leaderboard(new_value)

    def go_top_leaderboard(self):
        new_value = len(self.imagelist) - 1
        self.go_page_leaderboard(new_value)

    def go_random_leaderboard(self):
        new_value = randrange(len(self.imagelist) - 1)
        self.go_page_leaderboard(new_value)

    def go_specific_leaderboard(self, new_value):
        self.go_page_leaderboard(new_value)

    def go_page_leaderboard(self, new_value):
        self.contest_number_leaderboard = int(new_value)
        self.get_leaderboard_table()
        print("Leaderboard going to page", new_value)

    # Form submission

    def button_1_click(self):
        print("BUTTON 1 CLICK")
        self.handle_submit({"winner": "1"})

    def button_2_click(self):
        self.handle_submit({"winner": "2"})

    def handle_submit(self, form_data):
        print("HANDLE SUBMIT")
        with rx.session() as session:
            if "winner" in form_data.keys():
                if form_data["winner"] == "1":
                    new_rating_1, new_rating_2 = adjust_rating(
                        self.caption_1.rating, self.caption_2.rating
                    )
                    self.update_captions_rating(
                        session, new_rating_1, new_rating_2)
                else:
                    new_rating_2, new_rating_1 = adjust_rating(
                        self.caption_2.rating, self.caption_1.rating
                    )
                    self.update_captions_rating(
                        session, new_rating_1, new_rating_2)
                print("WINNER")
                self.load_two_captions_to_rate()
            else:
                self.add_new_caption(
                    session, self.contest_number_rating, form_data["new_name"], form_data["new_caption"]
                )
                self.get_leaderboard_table()
            print("commited")
            session.commit()
