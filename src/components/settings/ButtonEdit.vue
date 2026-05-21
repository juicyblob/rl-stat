<script setup lang="ts">
import IconEdit from '@/assets/icons/IconEdit.vue';
import { computed } from 'vue';

const { background = 'default' } = defineProps<{ background?: 'default' | 'blue' }>();

const backStyle = computed(() => {
    return {
        bg: background === 'blue' ? 'bg-(--color-blue)' : 'bg-(--color-ghost68)',
        hover: background === 'blue' ? 'hover:bg-(--color-blue)' : 'hover:bg-(--color-ghost)'
    }
});

</script>

<template>
    <button 
        class="
            flex 
            items-center 
            justify-center 
            w-6.25 
            h-6.25
            rounded-sm
            cursor-pointer
            transition 
            duration-200 
            ease-out 
            " 
            :class="`${backStyle.bg} ${backStyle.hover}`"
            ">
        <IconEdit width="13" height="13" />
    </button>
</template>