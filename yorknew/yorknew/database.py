from rxconfig import config
import reflex as rx
from typing import List


# Database for the rankings of each caption
class Entry(rx.Model, table=True):
    subject: int
    name: str
    caption: str
    rating: int

# State for updating the current panel being observed


class State(rx.State):
    ratingspage: int
    rankingspage: int

    # For general purpose
    captions_set: list[Entry]

    # For rating systems
    test_caption_1: Entry
    test_caption_2: Entry
    test_caption_custom: Entry

    def get_captions_for_subject(self, subject):
        with rx.session() as session:
            self.captions = session.exec(
                Entry.select.where(
                    Entry.subject == subject
                ).all()
            )

    def get_two_captions_for_subject(self, subject):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == subject
                ).all()
            )

    def update_captions_rating(self, caption_1_new_r, caption_2_new_r):
        with rx.session() as session:
            session.add(
                User(
                    username=self.username, email=self.email
                )
            )
            session.commit()
