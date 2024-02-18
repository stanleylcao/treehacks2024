from collections import defaultdict
import reflex as rx
from yorknew.ELO import adjust_rating
from sqlmodel import Session, select
from os import listdir
from typing import Any, List, Sequence
from random import randrange

import random

path_to_contest_images = "./assets/contest_images/"
entrycolumns = ["Rating", "User", "Caption"]
user_elo_columns = ["Rank", "User", "Elo", "Votes"]

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


class Comparison(rx.Model, table=True):
    subject: int
    caption_1: str
    caption_2: str
    name_1: str
    name_2: str
    one_is_better: bool


# State for updating the current panel being observed


class State(rx.State):
    imagelist: List[str] = listdir(path_to_contest_images)
    displist: List[str] = [str(x) for x in range(0, len(imagelist))]

    contest_number_leaderboard: int = 5
    contest_number_rating: int = 0

    # For leaderboard display
    leaderboard_table: list[list]
    user_elo_table: list[list]
    n_users: int = 0
    n_comparisons: int = 0

    # For rating page
    caption_1: Entry = None
    caption_2: Entry = None

    @staticmethod
    def convert_entry_to_list(entry) -> tuple[int, str, str]:
        return [round(entry.rating, 0), entry.name, entry.caption]

    def get_leaderboard_table(self):
        with rx.session() as session:
            entry_list = session.exec(
                Entry.select.where(
                    Entry.subject == self.contest_number_leaderboard)
            )
            self.leaderboard_table = list(
<<<<<<< HEAD
                map(State.convert_entry_to_list, entry_list))
=======
                # sort by ELO rating
                sorted(
                    map(State.convert_entry_to_list, entry_list),
                    key=lambda x: x[0],
                    reverse=True,
                )
            )
>>>>>>> refs/remotes/origin/master

    def get_user_elo_table(self):
        with rx.session() as session:
            users = session.exec(select(Entry.name).distinct()).all()
            comparisons: Sequence[Comparison] = list(
                session.exec(
                    Comparison.select.where(True).order_by(Comparison.id)
                ).all()
            )
        user_elo_table = {user: 0 for user in users}

        for comparison in comparisons:
            winner = (
                comparison.name_1 if comparison.one_is_better else comparison.name_2
            )
            loser = comparison.name_2 if comparison.one_is_better else comparison.name_1

            user_elo_table[winner], user_elo_table[loser] = adjust_rating(
                user_elo_table[winner], user_elo_table[loser]
            )

        self.n_users = len(users)
        self.n_comparisons = len(comparisons)

        self.user_elo_table = list(
            sorted(
                [
                    [
                        name,
                        round(rating, 0),
                        len(
                            [
                                c
                                for c in comparisons
                                if (c.name_1 == name or c.name_2 == name)
                            ]
                        ),
                    ]
                    for name, rating in user_elo_table.items()
                ],
                key=lambda x: x[1],
                reverse=True,
            )
        )
        self.user_elo_table = [
            [i + 1, name, rating, n_comparisons]
            for i, (name, rating, n_comparisons) in enumerate(self.user_elo_table)
        ]

    def clear_db(self):
        with rx.session() as session:
            entry_list = session.exec(Entry.select.where(True))
            for e in entry_list:
                session.delete(e)
            session.commit()

    @staticmethod
    def strip_quotes(entry: Entry):
        s = entry.caption
        if len(s) > 1 and s[0] == s[-1] and s.startswith(("'", '"')):
            entry.caption = s[1:-1]
        return entry

    def load_two_captions_to_rate(self):
        with rx.session() as session:
            entry_list = list(
                session.exec(
                    Entry.select.where(
                        Entry.subject == self.contest_number_rating)
                )
            )
            print(f'contest number rating {self.contest_number_rating}')
            print(f'entry list {entry_list}')
            print(self.caption_1)
            if len(entry_list) >= 2:
                print(f'entry list!')
                self.caption_1, self.caption_2 = random.sample(entry_list, 2)
                # tuple(map(
                #     State.strip_quotes, random.sample(entry_list, 2)))
            else:
                self.caption_1, self.caption_2 = None, None

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

                session.add(
                    Comparison(
                        subject=self.contest_number_rating,
                        caption_1=self.caption_1.caption,
                        caption_2=self.caption_2.caption,
                        name_1=self.caption_1.name,
                        name_2=self.caption_2.name,
                        one_is_better=form_data["winner"] == "1",
                    )
                )
            else:
                self.add_new_caption(
                    session,
                    self.contest_number_rating,
                    form_data["new_name"],
                    form_data["new_caption"],
                )
                self.get_leaderboard_table()
            print("commited")
            session.commit()
