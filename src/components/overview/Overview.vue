<script setup lang="ts">
import { useStatsStore } from '@/stores/stats.store';
import KeyMetrics from './KeyMetrics.vue';
import { onMounted } from 'vue';
import { DEV_USER_ID } from '@/constants';
import WinRate from './WinRate.vue';
import GoalsDymanics from './GoalsDymanics.vue';

const statsStore = useStatsStore();

onMounted(() => {
    statsStore.fetchUserStats(DEV_USER_ID);
});


</script>

<template>
    <div>
        <KeyMetrics 
            :matches="statsStore.stats?.matches ?? 0"
            :goals="statsStore.stats?.goals ?? 0"
            :saves="statsStore.stats?.saves ?? 0"
            :assists="statsStore.stats?.assists ?? 0" 
        "/>
    </div>

    <div class="flex h-77.5 mt-5 gap-5">
        <WinRate :win_rate="parseInt(statsStore.stats?.win_rate ?? '60')" class="w-77.5" />
        <GoalsDymanics class="grow"/>
    </div>
</template>