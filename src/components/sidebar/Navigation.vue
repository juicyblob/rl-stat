<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue';


const navLinks = [
    { name: 'Overview', path: '/overview', icon: 'overview'},
    { name: 'Game List', path: '/games', icon: 'gamelist'},
    { name: 'Top 5 Matches', path: '/top5', icon: 'top5'},
    { name: 'Rank History', path: '/rank-history', icon: 'ranklogs'},
    { name: 'Settings', path: '/settings', icon: 'settings'}
];

</script>

<template>
    <nav class="flex flex-col gap-5 mt-12.5">
        <RouterLink 
            v-for="link in navLinks"
            :key="link.icon"
            :to="link.path"
            class="nav-link"
            active-class="active-nav-link"
        >
            <div class="flex items-center gap-3 p-3">
                <NavIcon :data="link.icon" />
                <span class="text-[0.8125rem]/[1] opacity-[0.68]">{{ link.name }}</span>
            </div>
        </RouterLink>
    </nav>
</template>

<style scoped>
    .nav-link {
        border-radius: 4px;
    }

    .nav-link :deep(svg) {
        fill: #ACAFB8;
    }

    .active-nav-link {
        @apply bg-(--color-blue);
    }

    .active-nav-link span {
        @apply opacity-100;
    }

    .active-nav-link :deep(svg) {
        fill: var(--color-light);
    }
</style>