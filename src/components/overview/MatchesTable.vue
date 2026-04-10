<script setup lang="ts">
import { useMatchesStore } from '@/stores/matches.store';
import MatchRow from './MatchRow.vue';
import { onMounted, ref } from 'vue';
import { DEV_USER_ID } from '@/constants';
import type { Match } from '@/interfaces/match.interface';

const { select } = defineProps<{ select: 'last' | 'list' }>();

const matchesStore = useMatchesStore();
const matches = ref<Match[]>([]);

onMounted( async () => {
    if (select == 'last') {
        await matchesStore.fetchLastMatches(DEV_USER_ID);
        matches.value = matchesStore.lastMatches ?? []; 
    }
});

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

        <div>
            <MatchRow 
                v-for="(match, index) in matches"
                :key="match.id"
                :num="index"
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
    </div>
</template>