<script setup lang="ts">
import type { ButtonConfirmBackground } from '@/constants.ts';
import ButtonClose from './ButtonClose.vue';
import ButtonConfirm from './ButtonConfirm.vue';
import { useConfirmModalStore } from '@/stores/confirmModal.store.ts';

const { open, title, text, buttons } = defineProps<{
    open: boolean,
    title: string,
    text: string,
    buttons: { text: string, bg: ButtonConfirmBackground }[]
}>();

const confirmModalStore = useConfirmModalStore();

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
                            :bg="btn.bg" />
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