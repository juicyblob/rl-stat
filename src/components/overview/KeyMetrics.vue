<script setup lang="ts">
import { computed } from 'vue';

    const { matches, goals, saves, assists } = defineProps<{ 
        matches: number, 
        goals: number, 
        saves: number, 
        assists: number 
    }>();

    const matchRanges = [100, 500, 1000, 1500, 2000, 3000, 4000, 5000];
    const goalsRanges = [0.5, 0.9, 1.2, 1.5, 1.8, 2, 2.4, 2.7];
    const savesRanges = [0.3, 0.5, 0.7, 0.9, 1.2, 1.4, 1.7, 2];
    
    const calculateBars = (value: number, ranges_arr: number[]) => {
        let bars = 2;
        let targetValue = value === matches ? matches : value / matches;
        for (let i = 0; i < ranges_arr.length; i++) {
            const current = ranges_arr[i];
            if (current !== undefined && targetValue < current) {
                return bars + i;
            }
        }

        return 10;
    }

    const statsModified = computed(() => {
        return [
            {
                id: 1,
                title: `Matches`,
                count: matches,
                power: calculateBars(matches, matchRanges)

            },
            {
                id: 2,
                title: `Goals`,
                count: goals,
                power: calculateBars(goals, goalsRanges)
            },
            {
                id: 3,
                title: `Saves`,
                count: saves,
                power: calculateBars(saves, savesRanges)
            },
            {
                id: 4,
                title: `Assists`,
                count: assists,
                power: calculateBars(assists, savesRanges)
            }
        ]
    });

    
</script>

<template>
    <div class="flex gap-5">
        <div
            v-for="stat in statsModified"
            :key="stat.id" 
            class="relative bg-(--color-blocks) p-5 rounded-[11px] flex flex-col gap-3 basis-50.75 shrink-0 grow"
        >
            <span class="text-xl/normal text-(--color-muted)">{{ stat.title }}</span>
            <span class="font-(family-name:--font-jetbrains) text-5xl/[1] font-bold">{{ stat.count }}</span>
        
            <div class="absolute top-8 right-5 flex flex-col gap-1.25">
                <div 
                    v-for="i in 10"
                    :key="i"
                    class="w-4 h-0.5"
                    :class="i > 10 - stat.power ? 'bg-(--color-blue)' : 'bg-(--color-muted)'"
                ></div>
            </div>
        </div>
        
    </div>
</template>