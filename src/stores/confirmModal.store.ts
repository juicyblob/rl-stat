import { DEFAULT_CONFIRM, type ButtonConfirmBackground } from "@/constants";
import { lockScroll, unlockScroll } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfirmModalStore = defineStore('confirm', () => {
    const isOpen = ref<boolean>(false);
    const title = ref<string>(DEFAULT_CONFIRM.title);
    const text = ref<string>(DEFAULT_CONFIRM.text);
    const buttons = ref<{ text: string, bg: ButtonConfirmBackground }[]>(DEFAULT_CONFIRM.buttons);

    function open(modalTitle: string, modalText: string, modalButtons: {text: string, bg: ButtonConfirmBackground}[]) {
        lockScroll();
        title.value = modalTitle;
        text.value = modalText;
        buttons.value = modalButtons;
        isOpen.value = true;
    }

    function close() {
        unlockScroll();
        isOpen.value = false;
        setTimeout(() => {
            title.value = DEFAULT_CONFIRM.title;
            text.value = DEFAULT_CONFIRM.text;
            buttons.value = DEFAULT_CONFIRM.buttons;
        }, 400);
        
    }

    return {
        isOpen,
        title,
        text,
        buttons,
        open,
        close
    }
});