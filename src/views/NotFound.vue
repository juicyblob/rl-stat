<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHome() {
    router.push('/');
}
</script>

<template>
    <div class="w-full min-h-full flex items-center justify-center">
        <div class="max-w-85 text-center flex flex-col gap-8 items-center">
            <span class="font-(family-name:--font-jetbrains) text-[6rem]/[1] text-(--color-muted)">404</span>
            <div class="flex flex-col gap-4">
                <span class="text-4xl/[1.3] font-bold">Page not found</span>
                <span>The page you're looking for doesn't exist.</span>
            </div>
            <button
                class="
                bg-linear-(--color-gradient) 
                text-base/[1] 
                px-6 
                py-2.5 
                rounded-sm 
                cursor-pointer 
                transition 
                duration-300 
                ease-out 
                hover:shadow-(--drop-shadow-btn)
                "
                @click="goToHome">
                Go back home
            </button>
        </div>
    </div>

</template>