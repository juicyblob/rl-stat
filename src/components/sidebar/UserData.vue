<script setup lang="ts">
import { ROOT_DIR } from '@/constants';
import { computed } from 'vue';

const { image, nickname, rank } = defineProps<{ image: string, nickname: string, rank: string}>();

function capitalizeFirst(text: string) {
    return text[0]?.toUpperCase() + text.substring(1);  
}

const imageUrl = computed(() => {
    return `${ROOT_DIR}/${image}`;
});

</script>

<template>
    <div class="flex items-center gap-3.5 mt-10">
        <div class="w-15 h-15 rounded-[11px] overflow-hidden">
            <img :src="imageUrl" alt="User Image" class="block w-full h-full object-cover" loading="lazy">
        </div>
        <div class="flex flex-col gap-1.5">
            <span class="text-base/[1.3] font-semibold">{{ capitalizeFirst(nickname) }}</span>
            <span class="text-sm/[1.3] text-(--color-ghost)">{{ capitalizeFirst(rank) }}</span>
        </div>
    </div>
</template>