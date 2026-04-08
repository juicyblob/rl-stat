<script setup lang="ts">
const { title } = defineProps<{ title: string}>();
</script>

<template>
    <div class="bg-(--color-blocks) py-4 px-5 w-77.5 rounded-[11px]">
        <div class="flex flex-col h-full items-stretch">
            <div class="flex items-center justify-between border-b border-(--color-muted) pb-3">
                <h3 class="text-base/[1.25rem] font-semibold">{{ title }}</h3>
                <slot name="filters"></slot>
            </div>
            <div class="relative h-full">
                <slot />
            </div>
        </div>
    </div>
</template>