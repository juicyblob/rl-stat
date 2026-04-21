<script setup lang="ts">
    const { rows = 4 } = defineProps<{ rows: number }>();

</script>

<template>
    <div class="flex flex-col gap-2 animate-pulse">
        <div 
        class="
        bg-(--color-row) 
        h-10 
        rounded-sm
        "
        v-for="i in rows"
        :key="i"
        >
        </div>
    </div>
</template>