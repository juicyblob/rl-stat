export interface Match {
    id?: number;
    user_id: number;
    created_at?: string;
    score_for: number;
    score_against: number;
    result: string;
    goals: number;
    assists: number;
    saves: number;
    mode: string;
}

export type MatchResponse = {
    items: Match[];
}