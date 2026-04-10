import { API_ROUTES } from "@/api";
import type { Match, MatchResponse } from "@/interfaces/match.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchesStore = defineStore('matches', () => {
    const lastMatches = ref<Match[]>();

    async function fetchLastMatches(user_id: number) {
        const { data } = await axios.get<MatchResponse>(`${API_ROUTES.matches(user_id)}/last`);
        lastMatches.value = data.items;
    }

    return { lastMatches, fetchLastMatches };
});