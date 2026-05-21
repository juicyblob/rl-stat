<script setup lang="ts">
    const { title } = defineProps<{ title: string }>();
</script>

<template>
    <div>
        <h3 class="mb-6 text-xl/snug font-semibold">{{ title }}</h3>
        <slot />
    </div>
</template>