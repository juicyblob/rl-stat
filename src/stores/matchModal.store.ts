import type { ModalMode } from "@/constants";
import type { Match } from "@/interfaces/match.interface";
import { lockScroll, unlockScroll } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchModalStore = defineStore('matchModal', () => {
    const isOpen = ref<boolean>(false);
    const mode = ref<ModalMode>(null);
    const selectedMatch = ref<Partial<Match>>();

    function open(modalMode: ModalMode, matchData?: Partial<Match>) {
        lockScroll();
        isOpen.value = true;
        selectedMatch.value = matchData;
        mode.value = modalMode;
    }

    function close() {
        unlockScroll();
        isOpen.value = false;
        mode.value = null;
        selectedMatch.value = undefined;
    }

    return {
        isOpen,
        mode,
        selectedMatch,
        open,
        close
    }
});