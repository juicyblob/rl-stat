<script setup lang="ts">
    const { direction = 'left' } = defineProps<{ direction?: 'left' | 'right' }>();
</script>

<template>
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg" :style="direction == 'right' ? {transform: 'scaleX(-1)'} : {}">
        <path d="M4.3441 0.5L0.611509 3.51479C0.470068 3.62903 0.461947 3.84182 0.594269 3.96651L4.3441 7.5" stroke="#F7FBFE" stroke-linecap="round" />
    </svg>
</template>