""" This page contains the leaderboard for displaying scores """
from rxconfig import config
import reflex as rx

import yorknew.components.styles as styles
from yorknew.components.scroller import leaderboardscroller
import yorknew.database as db


def rankingscontent():
    return rx.center(
        rx.vstack(
            # Heading
            rx.heading(
                f"Caption Leaderboard for Image \
				{db.State.contest_number_leaderboard}",
                size="7",
            ),
            # Image
            rx.image(src=f"/contest_images/{db.State.imagelist \
				[db.State.contest_number_leaderboard - 1]}", height="400px"),
            # Scroller
            leaderboardscroller(),  # replace with ranking_page statevar
            rx.data_table(
                data=db.State.leaderboard_table,
                columns=db.entrycolumns,
                on_paste=True,
                draw_focus_ring=False,
                freeze_columns=2,
                group_header_height=50,
                header_height=60,
                max_column_width=300,
                # min_column_width=100,
                row_height=50,
                row_markers="clickable-number",
                smooth_scroll_x=True,
                vertical_border=False,
                column_select="multi",
                overscroll_x=100,
                theme=styles.rankingtheme,
                # on_cell_clicked=DataTableState2.get_clicked_data,
                # on_cell_edited=DataTableState2.get_edited_data,
                # on_group_header_context_menu=DataTableState2.get_group_header_right_click,
                # on_item_hovered=DataTableState2.get_item_hovered,
                # on_delete=DataTableState2.get_deleted_item,
                # on_column_resize=DataTableState2.column_resize,
            ),
            align="center",
            spacing="7",
            font_size="2em",
        ),
        height="100vh",
    )
