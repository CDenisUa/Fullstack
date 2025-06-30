// Core
import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
// Types
import { UseAuthStore } from "./useAuthStore.types.ts";

export const useAuthStore = create<UseAuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/checkAuth");
            set({
                authUser: res.data,
            })
        } catch (error) {
            set({
                authUser: null,
            });
            console.error("Error in checkAuth: ", error);
        } finally {
            set({
                isCheckingAuth: false,
            })
        }
    },
    signUp: async () => {

    }
}));