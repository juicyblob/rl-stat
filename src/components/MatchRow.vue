<script setup lang="ts">
import IconEdit from '@/assets/icons/IconEdit.vue';
import IconTrash from '@/assets/icons/IconTrash.vue';
import { computed } from 'vue';

const { 
    num = 0,
    date,
    score_for = 0,
    score_against = 0,
    result = 'win',
    goals = 0,
    assists = 0,
    saves = 0,
    mode = '3x3',

} = defineProps<{ 
    num: number,
    date: string,
    score_for: number,
    score_against: number,
    result: string,
    goals: number,
    assists: number,
    saves: number,
    mode: string,
}>();

function formatDate(inputDate: Date | string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
}

const matchData = computed(() => {
    return {
        num: `#${num}`,
        match_date: formatDate(date),
        score: `${score_for}:${score_against}`,
        resultBack: result == 'win' ? 'var(--color-blue)' : 'var(--color-red)'
    }
});

</script>

<template>
    <div class="match-row">
        <div class="flex items-center gap-15">
            <span class="w-8">{{ matchData.num }}</span>
            <span>{{ matchData.match_date }}</span>
            <span>{{ matchData.score }}</span>
            <div class="
                font-(family-name:--font-sora) 
                text-sm/[1] 
                font-light 
                bg-(--color-blue) 
                py-0.75 
                w-12.25 
                text-center 
                rounded-full
                "
                :style="{ backgroundColor: matchData.resultBack}"
                >{{ result }}</div>
        </div>

        <div class="flex items-center gap-12.5">
            <span>{{ goals }}</span>
            <span>{{ assists }}</span>
            <span>{{ saves }}</span>
        </div>

        <span>{{ mode }}</span>

        <div class="flex items-center gap-5 mr-1.5">
            <button class="shrink-0 cursor-pointer">
                <IconEdit />
            </button>
            <button class="shrink-0 cursor-pointer">
                <IconTrash />
            </button>
        </div>
    </div>
</template>