"""seed data

Revision ID: 97c69e9fc3d9
Revises: 2ef1afab3888
Create Date: 2024-02-18 00:00:25.510742

"""

from pathlib import Path
from typing import Sequence, Union

from alembic import op
import pandas as pd
import sqlalchemy as sa
import reflex as rx
import yorknew.database as db


# revision identifiers, used by Alembic.
revision: str = "97c69e9fc3d9"
down_revision: Union[str, None] = "2ef1afab3888"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


REFLEX_ROOT_DIR = Path(__file__).parent.parent.parent


def upgrade() -> None:
    df = pd.read_csv(REFLEX_ROOT_DIR / "data" / "combined_df.csv")
    print("Initializing database...")
    added_items = 0
    with rx.session() as session:
        for item in df.itertuples():
            entry = db.Entry(
                name=item.name,
                caption=item.caption,
                rating=item.rating,
                subject=item.subject,
            )
            if not session.exec(
                db.Entry.select.where(
                    (db.Entry.name == item.name) & (db.Entry.subject == item.subject)
                )
            ).first():
                session.add(entry)
                added_items += 1

        session.commit()
    print("Database initialized! Added {} missing items".format(added_items))


def downgrade() -> None:
    raise ValueError("Downgrade not supported")
