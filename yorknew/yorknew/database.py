from rxconfig import config
import reflex as rx
from typing import List

entrycolumns = ["Rating", "User", "Caption"]

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
    leaderboard_table: list[list]

    # For rating systems
    test_caption_1: Entry
    test_caption_2: Entry

    def convert_entry_to_list(entry):
        return [entry.rating, entry.user, entry.caption]

    def get_all_captions_for_subject(self, subject):
        with rx.session() as session:
            self.captions_set = session.exec(
                Entry.select.where(
                    Entry.subject == subject
                ).all()
            )
    
    
    def load_two_captions_for_subject(self, subject):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == subject
                ).all()
            )
    
    def update_captions_rating(self, caption_1_new_r, caption_2_new_r):
        with rx.session() as session:
            self.test_caption_1.rating = caption_1_new_r
            session.add(test_caption_1)
            self.test_caption_2.rating = caption_2_new_r
            session.add(test_caption_2)
            session.commit()
    
    def add_new_caption(self, subject, name, caption):
        with rx.session() as session:
            session.add(
                Entry(
                    subject=self.subject,
                    name=self.name,
                    caption=self.caption, 
                    rating=0,
                )
            )
            session.commit()
    
    

