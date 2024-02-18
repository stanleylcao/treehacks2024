import reflex as rx
from yorknew.ELO import adjust_rating
from sqlmodel import Session

import random

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
    contest_number_leaderboard: int = 0
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
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == self.contest_number_rating).all()
                # Entry.select.contains(self.contest_number_rating).all()
            )
            self.caption_1, self.caption_1 = random.sample(entry_list, 2)

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

    def handle_submit(self, form_data):
        self.load_two_captions_to_rate(db.State.contest_number_rating)
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
            else:
                self.add_new_caption(
                    session, 0, form_data["new_name"], form_data["new_caption"]
                )
                self.get_leaderboard_table()
            print("commited")
            session.commit()
