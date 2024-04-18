export interface HistoryResponse {
    msg: string;
    games: Game[];
}

export interface Game {
    id: number;
    created_at: string;
    updated_at: string;
    status: string;
    player1_id: number;
    player2_name: string;
    winner_id: number;
}
