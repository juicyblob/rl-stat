import { API_ROUTES } from "@/api";
import { DEFAULT_USER } from "@/constants";
import type { User, UserResponse } from "@/interfaces/user.interface";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref<User>(DEFAULT_USER);

    async function fetchUser(user_id: number) {
        const { data } = await axios.get<UserResponse>(`${API_ROUTES.users}/${user_id}`);
        user.value = data.user;
    }

    return { user, fetchUser };
});