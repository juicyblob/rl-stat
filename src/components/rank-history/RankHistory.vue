<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import Panel from '../Panel.vue';
import RankDate from './RankDate.vue';
import { computed, onMounted, ref } from 'vue';
import { DEV_USER_ID } from '@/constants';
import NoData from '../NoData.vue';
import RankDateSkeleton from './RankDateSkeleton.vue';

const userStore = useUserStore();
const noData = ref<boolean>(false);
const isLoading = ref<boolean>(false);

async function loadRankHistory() {
    if (userStore.ranks.length === 0) {
        isLoading.value = true;
        await userStore.fetchRankHistory(DEV_USER_ID);
        isLoading.value = false;
        if (userStore.ranks.length < 2) {
            noData.value = true;
        }
    }
}

onMounted(() => {
    loadRankHistory();
});

function dateFormat(date: Date, type: 'short' | 'numeric' = 'short') {
    if (type === 'numeric') {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    }

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.toLocaleString('en-US', { year: '2-digit' });
    
    return `${day} ${month}/${year}`; 
}

function capitalizeFirst(str: string) {
    return str[0]?.toUpperCase() + str.slice(1);
}

const ranksData = computed(() => {
    return userStore.ranks.map((rank) => {
        const date = new Date(rank.rank_date ?? '');

        return {
            ...rank,
            dateString: dateFormat(date),
            rankImgUrl: `/ranks/${rank.rank_name.replace(' ', '')}.png`
        }
    });
});

const lastUpdated = computed(() => {
    const date = ranksData.value[0]?.rank_date;
    return date ? dateFormat(new Date(date), 'numeric') : '--';
});

</script>

<template>
    <NoData v-if="noData"/>
    <Panel v-else title="Rank History">
        <template #filters>
            <span class="text-xs/[1] text-(--color-light) opacity-68">Last updated {{ lastUpdated }}</span>
        </template>
        <div class="mt-5 flex flex-wrap gap-3.25 pb-37.5">
            <RankDateSkeleton 
                v-for="i in 16"
                :key="i"
                v-if="isLoading"
            />
            <RankDate 
                v-for="rank in ranksData"
                :key="rank.id"
                :date="rank.dateString"
                :rank-img="rank.rankImgUrl"
                :status="rank.status"
                v-else
            />
        </div>
        <div class="border-t border-(--color-muted) pt-3 pb-13">
            <div class="text-xs/5 text-(--color-light) opacity-68 flex gap-10.5">
                <div class="flex flex-col">
                    <span class="font-semibold">Current Rank:</span>
                    <span>{{ capitalizeFirst(userStore.user.current_rank) }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="font-semibold">Highest Rank:</span>
                    <span>{{ capitalizeFirst(userStore.user.highest_rank) }}</span>
                </div>
            </div>
        </div>
    </Panel>
</template>