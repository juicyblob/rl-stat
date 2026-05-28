export interface CreateMatch {
    score_for: number;
    score_against: number;
    goals: number;
    assists: number;
    saves: number;
    mode: string;
    match_comment?: string;
}