<script setup lang="ts">
import { computed, ref } from 'vue';
import ActionButton from '../common/ActionButton.vue';
import IconInfo from '@/assets/icons/IconInfo.vue';
import { useMatchModalStore } from '@/stores/matchModal.store.ts';
import { useConfirmModalStore } from '@/stores/confirmModal.store.ts';

const {
    match_id,
    num = 0,
    date,
    score_for = 0,
    score_against = 0,
    result = 'win',
    goals = 0,
    assists = 0,
    saves = 0,
    mode = '3x3',
    match_comment

} = defineProps<{
    match_id: number,
    num: number,
    date: string,
    score_for: number,
    score_against: number,
    result: string,
    goals: number,
    assists: number,
    saves: number,
    mode: string,
    match_comment: string,
}>();

const displayComment = ref<boolean>(false);
const matchModalStore = useMatchModalStore();
const confirmModalStore = useConfirmModalStore();

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

function showComment() {
    if (match_comment) {
        displayComment.value = true;
    }
}

function hideComment() {
    displayComment.value = false;
}

function matchModalOpen() {
    matchModalStore.open('edit', {
        id: match_id,
        score_for: score_for,
        score_against: score_against,
        goals: goals,
        saves: saves,
        assists: assists,
        match_comment: match_comment,
        mode: mode,
        result: result
    });
}

function confirmModalOpen() {
    confirmModalStore.open(
        'Delete this match?',
        'This will permanently delete this match. This action cannot be undone.',
        [
            { text: 'Cancel', bg: 'muted' },
            { text: 'Delete', bg: 'red' }
        ]
    );
}

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
                :style="{ backgroundColor: matchData.resultBack }">{{ result }}</div>
        </div>

        <div class="flex items-center gap-12.5">
            <span>{{ goals }}</span>
            <span>{{ assists }}</span>
            <span>{{ saves }}</span>
        </div>

        <span>{{ mode }}</span>

        <div class="flex items-center gap-2">
            <IconInfo
                @mouseover="showComment"
                @mouseout="hideComment"
                class="
                    mr-1.5
                    opacity-36
                    transition
                    duration-200"
                :class="match_comment ? 'hover:opacity-100' : ''" />
            <ActionButton type="edit" @click="matchModalOpen" />
            <ActionButton type="remove" @click="confirmModalOpen" />
        </div>

        <div
            v-if="match_comment"
            class="
                absolute
                bottom-9.75
                right-3
                max-h-18.5
                bg-(--color-deep)
                shadow-[0_0_7px_0_rgba(86,68,209,0.25)]
                rounded-[0.6875rem]
                py-2.5
                px-3
                font-(family-name:--font-sora)
                text-xs
                font-normal 
                max-w-78 
                w-fit
                h-fit
                pointer-events-none
                transition
                duration-200
            "
            :class="displayComment ? 'opacity-100' : 'opacity-0'">
            {{ match_comment }}
        </div>
    </div>
</template>