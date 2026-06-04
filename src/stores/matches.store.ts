import { API_ROUTES } from "@/api";
import type { MatchesSort } from "@/constants";
import type { CreateMatch } from "@/interfaces/create.interface";
import type { Match, MatchResponse } from "@/interfaces/match.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchesStore = defineStore('matches', () => {
    const lastMatches = ref<Match[]>();
    const matchesList = ref<Match[]>();
    const matchesTop = ref<Match[]>();
    const pages = ref<number>(0);
    const currentPage = ref<number>(1);
    const refreshMatches = ref<number>(0);

    async function fetchLastMatches(user_id: number) {
        const { data } = await axios.get<MatchResponse>(API_ROUTES.matchesLast(user_id));
        lastMatches.value = data.items;
    }

    async function fetchMatchesList(user_id: number, page_num: number, sort: MatchesSort | string) {
        const { data } = await axios.get<MatchResponse>(API_ROUTES.matches(user_id), {
            params: {
                page: page_num,
                sort: sort,
            }
        });
        matchesList.value = data.items;
        pages.value = data.total_pages;
    }

    async function fetchMatchesTop(user_id: number) {
        const { data } = await axios.get<MatchResponse>(API_ROUTES.matchesTop(user_id));
        matchesTop.value = data.items;
    }

    async function addMatch(user_id: number, newMatch: CreateMatch) {
        const { data} = await axios.post(API_ROUTES.matches(user_id), newMatch);
        return data;
    }

    async function updateMatch(match_id: number, payload: CreateMatch) {
        const { data } = await axios.patch(API_ROUTES.match(match_id), payload);
        return data;
    }

    return { 
        lastMatches, 
        matchesList, 
        pages, currentPage, 
        matchesTop, 
        refreshMatches, 
        fetchLastMatches, 
        fetchMatchesList, 
        fetchMatchesTop, 
        addMatch, 
        updateMatch 
    };
});