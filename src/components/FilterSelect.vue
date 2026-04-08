<script setup lang="ts">
import IconSelectArrow from '@/assets/icons/IconSelectArrow.vue';

</script>

<template>
    <div class="relative inline-block">
        <select class="bg-(--color-ghost) w-20.5 font-light text-xs/[1.2] px-2.25 py-1 rounded-full appearance-none outline-none">
            <option value="all">All time</option>
            <option value="month">Month</option>
        </select>

        <div class="absolute top-1/2 right-2.25 -translate-y-px">
            <IconSelectArrow />
        </div>
    </div>
    
</template>