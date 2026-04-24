import { API_ROUTES } from "@/api";
import type { MatchesSort } from "@/constants";
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

    return { lastMatches, matchesList, pages, currentPage, matchesTop, fetchLastMatches, fetchMatchesList, fetchMatchesTop };
});