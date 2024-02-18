# K-factor
K = 24


def adjust_rating(winner_rating: float, loser_rating: float) -> tuple[float, float]:
    R_A, R_B = winner_rating, loser_rating
    Q_A = 10 ** (R_A / 400)
    Q_B = 10 ** (R_B / 400)

    E_A = Q_A / (Q_A + Q_B)
    E_B = Q_B / (Q_A + Q_B)

    new_winner_rating = R_A + K * (1 - E_A)
    new_loser_rating = R_B + K * (0 - E_B)
    return new_winner_rating, new_loser_rating
