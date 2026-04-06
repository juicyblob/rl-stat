<script setup lang="ts">
import { useStatsStore } from '@/stores/stats.store';
import KeyMetrics from './KeyMetrics.vue';
import { onMounted } from 'vue';
import { DEV_USER_ID } from '@/constants';

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
</template>