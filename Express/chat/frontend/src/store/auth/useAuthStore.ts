// Core
import { create } from "zustand";
import {toast} from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
// Types
import type { UseAuthStoreType } from "./useAuthStore.types.ts";
import type { AxiosError } from "axios";

export const useAuthStore = create<UseAuthStoreType>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    setIsCheckingAuth: (value: boolean) => {
        set({ isCheckingAuth: value });
    },
    logIn: async (data: LoginTypes) => {
        set({ isLoggedIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            const e = error as AxiosError<{ message: string }>;
            toast.error(e.response?.data?.message ?? e.message);
        } finally {
            set({ isLoggedIn: false });
        }
    },
    signUp: async (data: SignUpForm) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            const e = error as AxiosError<{ message: string}>;
            toast.error(e.response?.data?.message ?? e.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            const e = error as AxiosError<{ message: string}>
            toast.error(e.response?.data?.message ?? e.message)
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            const e = error as AxiosError<{ message: string}>
            toast.error(e.response?.data?.message ?? e.message)
        }
    },
}));
