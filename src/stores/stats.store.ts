import { API_ROUTES } from "@/api";
import type { Stats, StatsResponse } from "@/interfaces/stats.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatsStore = defineStore('stats', () => {
    const stats = ref<Stats>();

    async function fetchUserStats(user_id: number) {
        const { data } = await axios.get<StatsResponse>(API_ROUTES.stats(user_id));
        stats.value = data.stats;
    }

    return { stats, fetchUserStats };
});