<script setup lang="ts">
import IconClose from '@/assets/icons/IconClose.vue';

</script>

<template>
    <button
        class="
            w-8
            h-8
            rounded-sm
            bg-(--color-ghost)
            flex
            items-center
            justify-center
            cursor-pointer
            transition
            duration-300
            ease-out
            hover:bg-(--color-muted)
        ">
        <IconClose />
    </button>
</template>