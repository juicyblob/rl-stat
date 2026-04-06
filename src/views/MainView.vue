<script setup lang="ts">
import Header from '@/components/header/Header.vue';
import Logo from '@/assets/icons/Logo.vue';
import NavIcon from '@/assets/icons/NavIcon.vue';
import Navigation from '@/components/sidebar/Navigation.vue';
import UserData from '@/components/sidebar/UserData.vue';
import { useUserStore } from '@/stores/user.store';
import { onMounted } from 'vue';
import { DEV_USER_ID } from '@/constants';

const userStore = useUserStore();

onMounted( async () => {
    await userStore.fetchUser(DEV_USER_ID);
});


</script>

<template>
    <aside class="w-75 bg-(--color-deep) pt-11 px-8 pb-29 shrink-0">
       <div class="flex flex-col h-full">
            <a href="/" class="no-underline text-(--color-light) text-2xl font-bold flex items-center gap-3">
                <Logo />
                <span>RL Stat</span>
            </a>
            <UserData 
                :image="userStore.user.user_image" 
                :nickname="userStore.user.nickname" 
                :rank="userStore.user.current_rank"
            />
            <Navigation />
            <button class="text-(--color-light) opacity-[0.68] flex items-center gap-3 pl-3 mt-auto cursor-pointer transition-opacity duration-300 ease-in hover:opacity-100">
                <NavIcon data="logout" />
                <span class="text-[0.8125rem]/[1]">Logout</span>
            </button>
       </div>
    </aside>
    <main class="p-11.5 w-full">
        <header class="mb-10">
            <Header :xp="userStore.user.xp" :rank="userStore.user.current_rank" />
        </header>
        <RouterView />
    </main>
</template>