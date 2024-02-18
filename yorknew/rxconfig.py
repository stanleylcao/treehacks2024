import reflex as rx
import os

config = rx.Config(
    app_name="yorknew",
    db_url=os.environ.get("REFLEX_DB", "sqlite:///reflex.db"),
)
