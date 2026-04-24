<script setup lang="ts">
import { useMatchesStore } from '@/stores/matches.store';
import MatchRow from './MatchRow.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { DEV_USER_ID, type MatchesSort } from '@/constants';
import type { Match } from '@/interfaces/match.interface';
import IconPagArrow from '@/assets/icons/IconPagArrow.vue';
import { storeToRefs } from 'pinia';
import MatchRowSkeleton from './MatchRowSkeleton.vue';

const { select, sort = 'date', pagination = false } = defineProps<{ select: 'last' | 'list', sort?: MatchesSort | string, pagination?: boolean }>();

const matchesStore = useMatchesStore();
const matches = ref<Match[]>([]);
const { pages, currentPage } = storeToRefs(matchesStore);
const per_page = 12;

const isLoading = ref<boolean>(false);

async function loadMatches() {
   isLoading.value = true;

   if (select == 'last') {
        await matchesStore.fetchLastMatches(DEV_USER_ID);
        matches.value = matchesStore.lastMatches ?? []; 
    } else if (select == 'list') {
        await matchesStore.fetchMatchesList(DEV_USER_ID, currentPage.value, sort);
        matches.value = matchesStore.matchesList ?? [];
    }
    
    isLoading.value = false;
}

function goToPrevPage() {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
}

function goToNextPage() {
    if (currentPage.value < pages.value) {
        currentPage.value += 1;
    }
}

watch([() => sort, currentPage], () => {
    loadMatches();
}, { immediate: true });

</script>

<template>
    <div class="mt-4">
        <div class="text-xs/[1] text-(--color-muted) flex mb-2">
                <span class="pl-3.25">Num</span>
                <span class="pl-17.25">Date</span>
                <span class="pl-18.5">Score</span>
                <span class="pl-15.5">Result</span>
                <span class="pl-18.5">Goals</span>
                <span class="pl-6">Assists</span>
                <span class="pl-5">Saves</span>
                <span class="pl-15.5">Mode</span>
                <span class="pl-22">Actions</span>
        </div>

        <MatchRowSkeleton v-if="isLoading" :rows="12" />

        <div class="flex flex-col gap-2" v-else>
            <MatchRow 
                v-for="(match, index) in matches"
                :key="match.id"
                :num="(currentPage - 1) * per_page + index + 1"
                :date="match.created_at ?? '--/--/--'"
                :score_for="match.score_for"
                :score_against="match.score_against"
                :result="match.result"
                :goals="match.goals"
                :assists="match.assists"
                :saves="match.saves"
                :mode="match.mode"
            />
        </div>
        <div v-if="pagination && pages > 1" class="flex gap-4 mt-8 mb-3">
            <button class="
                bg-(--color-row) 
                rounded-sm 
                w-19 
                h-10 
                flex 
                items-center 
                justify-center 
                gap-2 
                text-sm/[1.2] 
                cursor-pointer 
                transition 
                duration-200 
                ease-out 
                hover:bg-(--color-ghost)
                "
                @click="goToPrevPage"
            >
                <IconPagArrow />
                <span>Prev</span>
            </button>
            <button class="flex gap-2">
                <div class="
                    w-10 
                    h-10
                    rounded-sm 
                    flex 
                    items-center 
                    justify-center 
                    font-(family-name:--font-jetbrains) 
                    text-sm/[1]
                    transition 
                    duration-200 
                    ease-out 
                    hover:bg-(--color-ghost)
                    cursor-pointer
                    "
                    :class="page === currentPage ? 'bg-(--color-ghost)' : 'bg-(--color-row)'"
                    v-for="page in pages"
                    :key="page"
                    @click="currentPage = page"
                >
                    {{ page }}
                </div>
            </button>
            
            <button class="
                bg-(--color-row) 
                rounded-sm 
                w-19 
                h-10 
                flex 
                items-center 
                justify-center 
                gap-2 
                text-sm/[1.2] 
                cursor-pointer 
                transition 
                duration-200 
                ease-out 
                hover:bg-(--color-ghost)
                "
                @click="goToNextPage"
            >
                <span>Next</span>
                <IconPagArrow direction="right" />
            </button>
        </div>
    </div>
</template>