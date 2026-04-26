import { API_ROUTES } from "@/api";
import { DEFAULT_USER } from "@/constants";
import type { Rank, RankResponse } from "@/interfaces/rank.interface";
import type { User, UserResponse } from "@/interfaces/user.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref<User>(DEFAULT_USER);
    const ranks = ref<Rank[]>([]);

    async function fetchUser(user_id: number) {
        const { data } = await axios.get<UserResponse>(`${API_ROUTES.users}/${user_id}`);
        user.value = data.user;
    }

    async function fetchRankHistory(user_id: number) {
        const { data } = await axios.get<RankResponse>(API_ROUTES.ranks(user_id), {
            params: {
                limit: 32
            }
        });
        ranks.value = data.items;
    }

    return { user, ranks, fetchUser, fetchRankHistory };
});