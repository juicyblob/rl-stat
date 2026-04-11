<script setup lang="ts">
import IconBell from '@/assets/icons/IconBell.vue';
import IconMoon from '@/assets/icons/IconMoon.vue';
import { computed } from 'vue';

const { xp, rank } = defineProps<{ xp: number, rank: string}>();

const userData = computed(() => {
    return {
        points: `${xp}XP`,
        rank_image_url: `/ranks/${rank.toLowerCase().replace(" ", "")}.png`,
        bar_percent: `${(xp / 15000) * 100}%`,
    }
});


</script>

<template>
    <div class="flex justify-between">
        <div class="relative">
            <div class="bg-(--color-blocks) h-8 w-72.5 rounded-sm">
                <div class="bg-(--color-blue) h-full rounded-tl-sm rounded-bl-sm" :style="{ width: userData.bar_percent}"></div>
            </div>
            <div class="flex items-center gap-3 absolute top-1 left-3">
                <img :src="userData.rank_image_url" width="24" height="24" alt="rank" loading="lazy">
                <span class="font-(family-name:--font-jetbrains) text-sm/[1] font-bold">{{ userData.points }}</span>
            </div>
        </div>
        <div class="flex gap-8.5">
            <div class="flex gap-3.5">
                <button class="header-action-btn">
                    <IconBell />
                </button>
                <button class="header-action-btn">
                    <IconMoon />
                </button>
            </div>
            <button class="bg-linear-(--color-gradient) text-base/[1] px-6 py-2.5 rounded-sm cursor-pointer transition duration-300 ease-out hover:shadow-(--drop-shadow-btn)">Add Match</button>
        </div>
    </div>
</template>