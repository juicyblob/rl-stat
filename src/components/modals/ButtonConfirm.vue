<script setup lang="ts">
import type { ButtonConfirmBackground } from '@/constants';
import { computed } from 'vue';

const { text, bg } = defineProps<{
    text: string,
    bg: ButtonConfirmBackground
}>();

const background = computed((): string => {
    const btnBg = `bg-(--color-${bg})`;
    let hover = '';
    if (bg === 'muted') {
        hover = 'hover:bg-(--color-muted-hover)';
    } else if (bg === 'red') {
        hover = 'hover:bg-(--color-red-hover)';
    } else if (bg === 'blue') {
        hover = 'hover:bg-(--color-blue-hover)';
    }

    return `${btnBg} ${hover}`;
});

</script>

<template>
    <button
        class="
            w-34.75
            h-9.5
            rounded-sm
            text-(--color-light)
            text-base/[1.125]
            cursor-pointer
            shrink-0
            transition-colors
            duration-150
            ease-out
            hover:bg-(--color-muted-hover)
            "
        :class="background">
        {{ text }}
    </button>
</template>