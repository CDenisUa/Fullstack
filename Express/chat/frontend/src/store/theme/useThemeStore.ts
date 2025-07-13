// Core
import { create } from "zustand";
// Types
import type { THEME } from '../../constants'
import type { UseThemeTypes } from './useThemeStore.types.ts';
// Constants
import { THEMES } from '../../constants';


const getStoredTheme = (): THEME => {
    const stored = localStorage.getItem("chat-theme");

    if (THEMES.includes(stored as THEME)) {
        return stored as THEME;
    }
    return "coffee";
};

export const useThemeStore = create<UseThemeTypes>((set) => ({
    theme: getStoredTheme(),
    setTheme: (theme: THEME) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}))