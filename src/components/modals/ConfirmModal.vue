<script setup lang="ts">
import { DEV_USER_ID, type ButtonConfirmBackground } from '@/constants.ts';
import ButtonClose from './ButtonClose.vue';
import ButtonConfirm from './ButtonConfirm.vue';
import { useConfirmModalStore } from '@/stores/confirmModal.store.ts';
import { ref } from 'vue';
import { useMatchesStore } from '@/stores/matches.store.ts';
import { useStatsStore } from '@/stores/stats.store.ts';

const { open, title, text, buttons } = defineProps<{
    open: boolean,
    title: string,
    text: string,
    buttons: { text: string, bg: ButtonConfirmBackground }[]
}>();

const confirmModalStore = useConfirmModalStore();
const matchesStore = useMatchesStore();
const statsStore = useStatsStore();
const isDisabledConfirmButton = ref<boolean>(false);

function cancel() {
    confirmModalStore.close();
}

async function confirm() {
    if (confirmModalStore.matchId) {
        try {
            isDisabledConfirmButton.value = true;
            await matchesStore.removeMatch(confirmModalStore.matchId);

            statsStore.fetchUserStats(DEV_USER_ID);
            matchesStore.refreshMatches++;
            confirmModalStore.close();

            console.log('Матч успешно удален');

        } catch (err: any) {
            console.log(err.response?.data);
            console.log('Ошибка удаления матча');
        } finally {
            isDisabledConfirmButton.value = false;
        }
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
                    justify-center">
                <div
                    class="
                        relative
                        bg-(--color-blocks)
                        p-10
                        rounded-[0.6875rem]
                        w-115">
                    <h3 class="text-2xl/[1] font-semibold mb-5.5">{{ title }}</h3>
                    <p class="text-sm/relaxed font-normal w-71.5">{{ text }}</p>
                    <div class="mt-15.5 flex gap-4">
                        <ButtonConfirm
                            v-for="(btn, index) in buttons"
                            :key="index"
                            :text="btn.text"
                            :bg="btn.bg"
                            @click="index == 0 ? cancel() : confirm()"
                            :disabled="index == 0 ? false : isDisabledConfirmButton" />
                    </div>
                    <ButtonClose class="absolute top-6 right-6" @click="confirmModalStore.close" />
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