<script setup lang="ts">
import IconRankDown from '@/assets/icons/IconRankDown.vue';
import IconRankUp from '@/assets/icons/IconRankUp.vue';
import type { RankStat } from '@/constants';

const { date, rankImg, status } = defineProps<{ date: string, rankImg: string, status: RankStat }>();

</script>

<template>
    <div class="relative bg-(--color-ghost68) w-23 h-23 rounded-[0.6875rem] text-center">
        <div 
            class="
                bg-(--color-muted) 
                rounded-[0.6875rem] 
                font-(family-name:--font-jetbrains) 
                text-xs/[1] 
                font-medium
                text-center
                py-2.25
                "
            >
            {{ date }}
        </div>
        <img :src="rankImg" alt="Rank Image" class="block mx-auto mt-2" width="46" height="46">
        
        <div class="absolute left-1 bottom-1">
            <IconRankUp v-if="status === 'up'" />
            <IconRankDown v-else />
        </div>
        
    </div>
</template>