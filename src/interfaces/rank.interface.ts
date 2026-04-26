import type { RankStat } from "@/constants";

export interface Rank {
    id: number,
    rank_date: Date,
    rank_name: string,
    status: RankStat
}

export type RankResponse = {
    items: Rank[]
}