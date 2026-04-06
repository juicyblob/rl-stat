export interface Stats {
    user_id: number;
    matches: number;
    goals: number;
    saves: number;
    assists: number;
    wins: number;
    losses: number;
    win_rate: string;
}

export type StatsResponse = {
    stats: Stats;
}