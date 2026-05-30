<script setup lang="ts">
import IconEdit from '@/assets/icons/IconEdit.vue';
import IconRemove from '@/assets/icons/IconRemove.vue';
import { computed } from 'vue';

const { background = 'default', type = 'edit' } = defineProps<{
    background?: 'default' | 'blue',
    type?: 'edit' | 'remove'
}>();

const backStyle = computed(() => {
    return {
        bg: background === 'blue' ? 'bg-(--color-blue)' : 'bg-(--color-action)',
        hover: background === 'blue' ? 'hover:bg-(--color-blue) hover:shadow-(--drop-shadow-btn)' : 'hover:bg-(--color-action-hover)'
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
            shrink-0
            rounded-sm
            cursor-pointer
            transition 
            duration-200 
            ease-out 
            "
        :class="`${backStyle.bg} ${backStyle.hover}`" ">
    <IconEdit width=" 13" height="13" v-if="type === 'edit'" />
    <IconRemove v-if="type === 'remove'" />
    </button>
</template>