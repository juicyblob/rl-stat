<script setup lang="ts">
import IconBall from '@/assets/icons/IconBall.vue';
import IconHands from '@/assets/icons/IconHands.vue';
import IconShield from '@/assets/icons/IconShield.vue';
import { DEV_USER_ID } from '@/constants';
import { useMatchesStore } from '@/stores/matches.store';
import { computed, onMounted } from 'vue';

const matchesStore = useMatchesStore();

onMounted(() => {
    if (matchesStore.matchesTop === undefined) {
        matchesStore.fetchMatchesTop(DEV_USER_ID);
        console.log('данные загружены');
    }
});

const matchesTop = computed(() => {
    return matchesStore.matchesTop?.map((match) => {
        const date = new Date(match.created_at ?? '');

        return {
            ...match,
            score: `${match.score_for}:${match.score_against}`,
            day: date.getDate(),
            monthYear: date.toLocaleDateString('en-US', {
                month: 'short',
                year: '2-digit',
            }).replace(' ', '/'),
        }

    });
});

</script>

<template>
    <h3 class="text-base/normal font-semibold">Top 5 Matches</h3>

    <div 
    class="
    flex 
    flex-col 
    gap-3 
    mt-6" 
    v-for="(match, index) in matchesTop"
    :key="match.id"
    >
        <div class="relative flex gap-25 bg-(--color-blocks) h-23 items-center rounded-[11px] pl-8">
            <div class="
            absolute 
            top-0 
            left-0 
            rounded-tl-[11px] 
            rounded-bl-[11px] 
            w-2.5 
            h-full 
            "
            :class="index <= 2 ? 'bg-(--color-light) opacity-62' : 'bg-(--color-ghost)'"
            >
            </div>
            <div class="flex gap-10">
                <div class="flex gap-2.5">
                    <div class="font-(family-name:--font-jetbrains) text-4xl/normal opacity-50 italic font-bold">{{ `#${index + 1}` }}</div>
                    <div class="text-[1.125rem]/[1] bg-(--color-blue) h-8 px-5 flex items-center rounded-2xl">{{ match.mode }}</div>
                </div>
                <div class="font-(family-name:--font-jetbrains) text-4xl/normal font-bold text-(--color-green) text-shadow-[0_0_7px_rgb(74_222_128/0.39)]">
                    {{ match.score }}
                </div>
            </div>
            
            <div class="flex gap-10">
                <div class="flex items-center gap-5">
                    <IconBall />
                    <span class="font-(family-name:--font-jetbrains) text-4xl/normal font-bold">{{ match.goals }}</span>
                </div>
                <div class="flex items-center gap-5">
                    <IconShield />
                    <span class="font-(family-name:--font-jetbrains) text-4xl/normal font-bold">{{ match.saves }}</span>
                </div>
                <div class="flex items-center gap-5">
                    <IconHands />
                    <span class="font-(family-name:--font-jetbrains) text-4xl/normal font-bold">{{ match.assists }}</span>
                </div>
            </div>

            <div class="absolute top-0 right-10.75 bg-(--color-ghost) flex flex-col gap-1.5 font-(family-name:--font-jetbrains) items-center justify-center h-17 py-1.5 px-4 rounded-bl-[11px] rounded-br-[11px]">
                <span class="text-2xl/[1] font-bold text-(--color-light) opacity-50">{{ match.day }}</span>
                <span class="text-sm/[1] font-medium text-(--color-light) opacity-50">{{ match.monthYear }}</span>
            </div>
        </div>
    </div>
</template>