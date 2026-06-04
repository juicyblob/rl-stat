<script setup lang="ts">
import IconModeSelectArrow from '@/assets/icons/IconModeSelectArrow.vue';
import ButtonClose from './ButtonClose.vue';
import { computed, reactive, ref, watch } from 'vue';
import { useMatchesStore } from '@/stores/matches.store.ts';
import { DEV_USER_ID, type ModalMode } from '@/constants.ts';
import type { Match } from '@/interfaces/match.interface.ts';
import { useMatchModalStore } from '@/stores/modal.store.ts';
import { storeToRefs } from 'pinia';
import type { CreateMatch } from '@/interfaces/create.interface.ts';
import { useStatsStore } from '@/stores/stats.store.ts';

const { open = false, matchMode, match } = defineProps<{
    open: boolean,
    matchMode: ModalMode,
    match: Partial<Match> | undefined
}>();
const emit = defineEmits<{
    (e: 'close'): void
}>();

const matchesStore = useMatchesStore();
const statsStore = useStatsStore();
const matchModalStore = useMatchModalStore();
const { mode, selectedMatch } = storeToRefs(matchModalStore);

type StatsKey = 'scoreFor' | 'scoreAgainst' | 'goals' | 'saves' | 'assists';

const matchModes = [
    { value: '3x3', label: '3x3' },
    { value: '2x2', label: '2x2' },
    { value: '1x1', label: '1x1' }
];

const resultLabels = ['win', 'loss'];
const matchResult = ref<string>('');
const errorFields = ref<string[]>([]);
const isAssists = ref<boolean>(true);
const isDisabledSaveButton = ref<boolean>(false);

function changeMatchMode() {
    if (stats.mode === '1x1') {
        isAssists.value = false;
        stats.assists = '0';
        return;
    }

    isAssists.value = true;
    stats.assists = '-';
}

const stats = reactive({
    match_id: 0,
    scoreFor: '-',
    scoreAgainst: '-',
    goals: '-',
    saves: '-',
    assists: '-',
    comment: '',
    mode: matchModes[0]?.value
});

const modalData = computed(() => {
    return {
        title: matchMode === 'add' ? 'Add Match Result' : 'Edit Match Result',
        subtitle: matchMode === 'add' ? 'Track your performance' : 'Modify your match stats',
        buttonText: matchMode === 'add' ? 'Save match' : 'Save Changes'
    }
});

watch(() => [mode.value, selectedMatch.value] as const, ([newMode, newMatch]) => {
    if (newMode === 'edit' && newMatch) {
        fillStats(newMatch);
    }
}
);

function statsReset() {
    stats.match_id = 0;
    stats.scoreFor = '-';
    stats.scoreAgainst = '-';
    stats.goals = '-';
    stats.saves = '-';
    stats.assists = '-';
    stats.comment = '';
    stats.mode = matchModes[0]?.value;
    matchResult.value = '';
    errorFields.value.length = 0;
    isAssists.value = true;
}

function fillStats(match: Partial<Match>) {
    stats.match_id = match.id ?? 0;
    stats.scoreFor = String(match.score_for);
    stats.scoreAgainst = String(match.score_against);
    stats.goals = String(match.goals);
    stats.saves = String(match.saves);
    stats.assists = String(match.assists);
    stats.comment = match.match_comment ?? '';
    stats.mode = match.mode;
    matchResult.value = match.result ?? '';
}

function matchStatsPayload(): CreateMatch {
    return {
        score_for: Number(stats.scoreFor),
        score_against: Number(stats.scoreAgainst),
        goals: Number(stats.goals),
        assists: Number(stats.assists),
        saves: Number(stats.saves),
        mode: stats.mode ?? '3x3',
        match_comment: stats.comment.trim()
    }
}

function validateFields(): boolean {

    errorFields.value.length = 0;

    for (const [key, value] of Object.entries(stats)) {
        if (key !== 'comment') {
            if (value === '-') {
                errorFields.value.push(key);
            }
        }
    }

    if (Number(stats.scoreFor) === Number(stats.scoreAgainst)) {
        errorFields.value.push('scoreFor', 'scoreAgainst');
    }

    if (Number(stats.goals) > Number(stats.scoreFor)) {
        errorFields.value.push('goals');
    }

    if (Number(stats.goals) + Number(stats.assists) > Number(stats.scoreFor)) {
        errorFields.value.push('assists');
    }

    return errorFields.value.length === 0;
}

function resultButtonClass(res: string): string {
    if (res !== matchResult.value) {
        return 'bg-(--color-bg)';
    }

    return res === 'win'
        ? 'bg-(--color-green)'
        : 'bg-(--color-red)';
}

function errorFieldClass(name: string): string {
    return errorFields.value.includes(name)
        ? 'border border-(--color-red)'
        : '';
}

function calculateResult() {
    if (isNumber(stats.scoreFor) && isNumber(stats.scoreAgainst)) {

        const scoreFor = Number(stats.scoreFor);
        const scoreAgainst = Number(stats.scoreAgainst);

        if (scoreFor > scoreAgainst) {
            matchResult.value = 'win';
        } else if (scoreFor < scoreAgainst) {
            matchResult.value = 'loss';
        } else {
            matchResult.value = '';
        }
    } else {
        matchResult.value = '';
    }

    function isNumber(str: string): boolean {
        return str.trim() !== '' && !isNaN(Number(str))
    }
}

function handleInput(event: Event, key: StatsKey) {

    errorFields.value.length = 0;
    let val = (event.target as HTMLInputElement).value;

    if (val === '') {
        stats[key] = '-';
        calculateResult();
        return;
    }

    val = val.replace(/\D/g, '');
    const num = Math.min(Number(val), 20);
    stats[key] = String(num);

    calculateResult();
}

function handleFocus(event: Event, key: StatsKey) {
    let val = (event.target as HTMLInputElement).value;

    if (val === '-') {
        stats[key] = '';
    }
}

function handleBlur(event: Event, key: StatsKey) {
    let val = (event.target as HTMLInputElement).value;

    if (val === '') {
        stats[key] = '-';
    }
}

function closeModal() {
    emit('close');

    setTimeout(() => {
        statsReset();
    }, 300);

}

async function saveMatch() {
    if (!validateFields()) return;

    try {
        isDisabledSaveButton.value = true;
        if (mode.value === 'add') {
            await matchesStore.addMatch(DEV_USER_ID, matchStatsPayload());
        } else if (mode.value === 'edit') {
            await matchesStore.updateMatch(match?.id ?? 0, matchStatsPayload());
        }

        statsStore.fetchUserStats(DEV_USER_ID);
        matchesStore.refreshMatches++;
        closeModal();

        mode.value === 'add'
            ? console.log('Матч успешно добавлен!')
            : console.log('Изменения сохранены!')


    } catch (err: any) {
        console.log(err.response?.data);
        console.log('Ошибка создания матча');
    } finally {
        isDisabledSaveButton.value = false;
    }
}

</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-show="open"
                class="
                    fixed
                    inset-0
                    bg-(--color-deep)/60
                    backdrop-blur-[2px]
                    z-50
                    flex
                    items-center
                    justify-center    
                ">
                <div
                    class="
                        relative
                        bg-(--color-blocks)
                        pt-11.5
                        px-11.5
                        pb-13.75
                        rounded-[0.6875rem]
                        w-164
                    ">
                    <div>
                        <h3 class="text-2xl/[1] font-semibold mb-3">{{ modalData.title }}</h3>
                        <p class="text-sm/[1.2] text-(--color-muted)">{{ modalData.subtitle }}</p>

                        <div class="mt-8 flex justify-between">
                            <div class="flex flex-col gap-3 items-start">
                                <span class="text-sm/[1.2] text-(--color-muted)">Mode</span>
                                <div class="relative inline-block">
                                    <select
                                        v-model="stats.mode"
                                        @change="changeMatchMode"
                                        class="
                                            bg-(--color-bg)
                                            outline-none
                                            w-80
                                            text-sm/[1]
                                            px-4
                                            py-3
                                            h-10
                                            rounded-sm
                                            appearance-none
                                        ">
                                        <option
                                            v-for="mode in matchModes"
                                            :key="mode.value"
                                            :value="mode.value">
                                            {{ mode.label }}
                                        </option>
                                    </select>
                                    <div class="absolute top-1/2 right-4 -translate-y-1 pointer-events-none">
                                        <IconModeSelectArrow />
                                    </div>
                                </div>

                            </div>
                            <div class="flex flex-col gap-3 items-start">
                                <span class="text-sm/[1.2] text-(--color-muted)">Result</span>
                                <div class="flex gap-3">
                                    <button
                                        v-for="result in resultLabels"
                                        :key="result"
                                        class="
                                            w-23 
                                            h-10 
                                            rounded-sm 
                                            transition
                                            duration-200
                                            "
                                        :class="resultButtonClass(result)">
                                        {{ result }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex gap-13.75">
                            <div class="flex flex-col gap-3 items-start">
                                <span class="text-sm/[1.2] text-(--color-muted)">Score</span>
                                <div class="flex gap-2.5 items-center">
                                    <input
                                        type="text"
                                        v-model="stats.scoreFor"
                                        @input="handleInput($event, 'scoreFor')"
                                        @focus="handleFocus($event, 'scoreFor')"
                                        @blur="handleBlur($event, 'scoreFor')"
                                        class="
                                            w-15 
                                            h-10 
                                            bg-(--color-bg) 
                                            rounded-sm 
                                            appearance-none 
                                            text-center 
                                            outline-none"
                                        :class="errorFieldClass('scoreFor')">
                                    <span class="text-(--color-muted)">:</span>
                                    <input
                                        type="text"
                                        ref="score-against"
                                        v-model="stats.scoreAgainst"
                                        @input="handleInput($event, 'scoreAgainst')"
                                        @focus="handleFocus($event, 'scoreAgainst')"
                                        @blur="handleBlur($event, 'scoreAgainst')"
                                        class="
                                            w-15 
                                            h-10 
                                            bg-(--color-bg) 
                                            rounded-sm 
                                            appearance-none 
                                            text-center 
                                            outline-none"
                                        :class="errorFieldClass('scoreAgainst')">
                                </div>
                            </div>

                            <div class="flex gap-4.5">
                                <div class="flex flex-col gap-3 items-start">
                                    <span class="text-sm/[1.2] text-(--color-muted)">Goals</span>
                                    <input
                                        type="text"
                                        v-model="stats.goals"
                                        @input="handleInput($event, 'goals')"
                                        @focus="handleFocus($event, 'goals')"
                                        @blur="handleBlur($event, 'goals')"
                                        class="
                                            w-15 
                                            h-10 
                                            bg-(--color-bg) 
                                            rounded-sm 
                                            appearance-none 
                                            text-center 
                                            outline-none"
                                        :class="errorFieldClass('goals')">
                                </div>
                                <div class="flex flex-col gap-3 items-start">
                                    <span class="text-sm/[1.2] text-(--color-muted)">Saves</span>
                                    <input
                                        type="text"
                                        v-model="stats.saves"
                                        @input="handleInput($event, 'saves')"
                                        @focus="handleFocus($event, 'saves')"
                                        @blur="handleBlur($event, 'saves')"
                                        class="
                                            w-15 
                                            h-10 
                                            bg-(--color-bg) 
                                            rounded-sm 
                                            appearance-none 
                                            text-center 
                                            outline-none"
                                        :class="errorFieldClass('saves')">
                                </div>
                                <div class="flex flex-col gap-3 items-start" v-show="isAssists">
                                    <span class="text-sm/[1.2] text-(--color-muted)">Assists</span>
                                    <input
                                        type="text"
                                        v-model="stats.assists"
                                        @input="handleInput($event, 'assists')"
                                        @focus="handleFocus($event, 'assists')"
                                        @blur="handleBlur($event, 'assists')"
                                        class="
                                            w-15 
                                            h-10 
                                            bg-(--color-bg) 
                                            rounded-sm 
                                            appearance-none 
                                            text-center 
                                            outline-none"
                                        :class="errorFieldClass('assists')">
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex flex-col gap-3 items-start">
                            <span class="text-sm/[1.2] text-(--color-muted)">Comment (optional)</span>
                            <div class="relative h-21.5">
                                <textarea
                                    placeholder="That was difficult, yes..."
                                    v-model="stats.comment"
                                    maxlength="100"
                                    class="
                                    w-103.75 
                                    h-21.5 
                                    bg-(--color-bg) 
                                    rounded-sm 
                                    resize-none
                                    outline-none
                                    text-sm/[1.7]
                                    text-(--color-light)
                                    py-3
                                    px-4
                                    placeholder:text-(--color-ghost)
                                    placeholder:text-sm/[1.7]
                            "></textarea>
                                <span class="absolute right-3 bottom-2 text-xs text-(--color-blocks) select-none">
                                    {{ stats.comment.length }}/100
                                </span>
                            </div>

                        </div>

                        <button
                            @click="saveMatch"
                            :disabled="isDisabledSaveButton"
                            class="
                                mt-11.5
                                bg-linear-(--color-gradient) 
                                text-base/[1] 
                                px-6 
                                py-3
                                w-full 
                                rounded-sm 
                                cursor-pointer 
                                transition 
                                duration-300 
                                ease-out
                                disabled:bg-none
                                disabled:bg-(--color-ghost)
                                disabled:text-(--color-gray)
                                disabled:hover:shadow-none 
                                hover:shadow-(--drop-shadow-btn)
                            ">
                            Save match
                        </button>
                    </div>
                    <ButtonClose class="absolute top-10 right-11" @click="closeModal" />
                </div>
            </div>
        </Transition>
    </Teleport>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>