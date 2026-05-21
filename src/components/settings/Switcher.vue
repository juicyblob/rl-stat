<script setup lang="ts">
const emit = defineEmits<{
    (e: 'switching', value: boolean): void
}>();

const onSwitch = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    emit('switching', checked);
}

</script>

<template>
    <label class="relative block w-15 h-7 cursor-pointer">
        <input type="checkbox" class="peer sr-only" @change="onSwitch" checked>

        <div
            class="
                w-full
                h-full
                rounded-full
                bg-(--color-bg)
                transition
                duration-300
                ease-in-out
                peer-checked:bg-(--color-blue)
            " />

        <div
            class="
                absolute
                top-0.75
                left-0.75
                w-5.5
                h-5.5
                rounded-full
                bg-(--color-light)
                transition-transform
                duration-300
                ease-in-out
                peer-checked:translate-x-8
            " />
    </label>
</template>