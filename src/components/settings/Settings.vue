<script setup lang="ts">
import { computed, ref } from 'vue';
import ActionButton from '../ActionButton.vue';
import SettingsGroup from './SettingsGroup.vue';
import Switcher from './Switcher.vue';
import { useUserStore } from '@/stores/user.store';
import { ROOT_DIR } from '@/constants';

const userStore = useUserStore();
const notificationsLabel = ref<string>('Notification enabled');
const themeLabel = ref<string>('Dark theme enabled');

const imageUrl = computed(() => {
    return `${ROOT_DIR}/${userStore.user.user_image}`;
});

function switchNotifications(checked: boolean) {
    if (!checked) {
        notificationsLabel.value = 'Notification disabled';
    } else {
        notificationsLabel.value = 'Notification enabled';
    }
}

function switchTheme(checked: boolean) {
    if (!checked) {
        themeLabel.value = 'Dark theme disabled';
    } else {
        themeLabel.value = 'Dark theme enabled';
    }
}

</script>

<template>
    <div class="flex flex-col gap-8">
        <SettingsGroup title="Profile Details">
            <div class="bg-(--color-blocks) rounded-[0.6875rem] py-4 px-5">
                <div class="relative flex flex-col gap-3 mb-4 pb-3 border-b border-(--color-ghost)">
                    <span class="text-sm/[1.3] text-(--color-muted)">Nickname</span>
                    <span class="text-base/[1.3]">{{ userStore.user.nickname }}</span>
                    <ActionButton class="absolute top-3.5 right-0" />
                </div>
                <div class="relative flex flex-col gap-3 mb-4 pb-3 border-b border-(--color-ghost)">
                    <span class="text-sm/[1.3] text-(--color-muted)">Email</span>
                    <span class="text-base/[1.3]">{{ userStore.user.email }}</span>
                    <ActionButton class="absolute top-3.5 right-0" />
                </div>
                <div class="relative flex flex-col gap-3 mb-4 pb-3 border-b border-(--color-ghost)">
                    <span class="text-sm/[1.3] text-(--color-muted)">Password</span>
                    <span class="text-base/[1.3]">***********</span>
                    <ActionButton class="absolute top-3.5 right-0" />
                </div>
            </div>
        </SettingsGroup>
        <div class="flex gap-8.5">
            <SettingsGroup title="Change Photo">
                <div class="relative w-44.5 h-44.5 overflow-hidden rounded-[0.6875rem]">
                    <img :src="imageUrl" alt="User Image" class="object-cover w-full h-full">
                    <ActionButton background="blue" class="absolute bottom-3 right-3" />
                </div>
            </SettingsGroup>
            <SettingsGroup title="Notifications">
                <div
                    class="
                        bg-(--color-blocks)
                        w-74
                        rounded-[0.6875rem]
                        text-sm/[1.3]
                        text-(--color-muted)
                        flex
                        items-center
                        justify-between
                        gap-10
                        py-3
                        px-5
                    ">
                    <span>{{ notificationsLabel }}</span>
                    <Switcher @switching="switchNotifications" />
                </div>
            </SettingsGroup>
            <SettingsGroup title="Light Theme">
                <div
                    class="
                        bg-(--color-blocks)
                        w-74
                        rounded-[0.6875rem]
                        text-sm/[1.3]
                        text-(--color-muted)
                        flex
                        items-center
                        justify-between
                        gap-10
                        py-3
                        px-5
                    ">
                    <span>{{ themeLabel }}</span>
                    <Switcher @switching="switchTheme" />
                </div>
            </SettingsGroup>
        </div>
    </div>

</template>