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

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
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
    logIn: async (data: LoginTypes) => {
        set({ isLoggedIn: false});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data});
            toast.success("Logged is successfully");


        } catch (error) {
            const e = error as AxiosError<{ message: string}>;
            toast.error(e.response?.data?.message ?? e.message);
        } finally {
            set({ isLoggedIn: false });
        }
    },
    signUp: async (data: SignUpForm) => {
        set({ isSigningUp: true });

        try {
            await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
        } catch (error) {
            const e = error as AxiosError<{ message: string}>
            toast.error(e.response?.data?.message ?? e.message)
        } finally {
            set({ isSigningUp: false});
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