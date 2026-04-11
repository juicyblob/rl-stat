<script setup lang="ts">
import IconSelectArrow from '@/assets/icons/IconSelectArrow.vue';
import type { Filter } from '@/interfaces/filter.interface';

const { options = [ { value: 'date', label: 'Date' } ] } = defineProps<{ options: Filter[] }>();

const emit = defineEmits<{
    (e: 'updateValue', value: string): void
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('updateValue', target.value);
}

</script>

<template>
    <div class="relative inline-block">
        <select @change="onChange" class="bg-(--color-ghost) w-20.5 font-light text-xs/[1.2] px-2.25 py-1 rounded-full appearance-none outline-none">
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
            {{ option.label }}
            </option>
        </select>

        <div class="absolute top-1/2 right-2.25 -translate-y-px">
            <IconSelectArrow />
        </div>
    </div>
    
</template>