from rxconfig import config
import reflex as rx
from typing import List

class State(rx.State):
    data: List = [
        ["1", "42", "I do like turnips!", "Brion"],
        ["2", "-20", "I don't like turnips!", "Stanley"],
    ]
    columns: List[str] = ["Rank", "Points", "Caption", "Name"]
