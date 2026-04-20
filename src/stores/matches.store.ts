import { API_ROUTES } from "@/api";
import type { MatchesSort } from "@/constants";
import type { Match, MatchResponse } from "@/interfaces/match.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchesStore = defineStore('matches', () => {
    const lastMatches = ref<Match[]>();
    const matchesList = ref<Match[]>();
    const pages = ref<number>(0);
    const currentPage = ref<number>(1);

    async function fetchLastMatches(user_id: number) {
        const { data } = await axios.get<MatchResponse>(`${API_ROUTES.matches(user_id)}/last`);
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

    return { lastMatches, matchesList, pages, currentPage, fetchLastMatches, fetchMatchesList };
});