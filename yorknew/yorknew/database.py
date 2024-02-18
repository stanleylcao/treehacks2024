from rxconfig import config
import reflex as rx
from typing import List
from yorknew.ELO import adjust_rating

import random

entrycolumns = ["Rating", "User", "Caption"]

# Database for the rankings of each caption


class Entry(rx.Model, table=True):
    subject: int
    name: str
    caption: str
    rating: int


# State for updating the current panel being observed


class State(rx.State):
    contest_number_leaderboard: int
    contest_number_rating: int

    # For leaderboard display
    leaderboard_table: list[list]

#     # For rating systems
    test_caption_1: Entry = None
    test_caption_2: Entry = None

    @staticmethod
    def convert_entry_to_list(entry):
        return [entry.rating, entry.user, entry.caption]

    def get_leaderboard_table(self):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == self.contest_number_leaderboard).all()
            )
            self.leaderboard_table = map(
                State.convert_entry_to_list, entry_list)

    def load_two_captions_to_rate(self):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == self.contest_number_rating).all()
            )
            self.test_caption_1, self.test_caption_2 = \
                random.sample(entry_list, 2)

    def update_captions_rating(self, caption_1_new_r, caption_2_new_r):
        with rx.session() as session:
            self.test_caption_1.rating = caption_1_new_r
            session.add(self.test_caption_1)
            self.test_caption_2.rating = caption_2_new_r
            session.add(self.test_caption_2)
            session.commit()

    def add_new_caption(self, subject, name, caption):
        with rx.session() as session:
            session.add(
                Entry(
                    subject=subject,
                    name=name,
                    caption=caption,
                    rating=0,
                )
            )
            session.commit()

    def handle_submit(self, form_data):
        with rx.session() as session:
            if ('winner' in form_data.keys()):
                if (form_data['winner'] == '1'):
                    new_rating_1, new_rating_2 = adjust_rating(
                        self.test_caption_1.rating, self.test_caption_2.rating)
                    self.update_captions_rating(new_rating_1, new_rating_2)
                else:
                    new_rating_2, new_rating_1 = adjust_rating(
                        self.test_caption_2.rating, self.test_caption_1.rating)
                    self.update_captions_rating(new_rating_1, new_rating_2)
            else:
                self.add_new_caption(self.contest_number_rating,
                                     form_data['new_name'],
                                     form_data['new_caption'])
