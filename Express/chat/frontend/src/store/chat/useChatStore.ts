// Core
import { create } from "zustand";
import toast from 'react-hot-toast';
// Lib
import { axiosInstance } from "../../lib/axios.ts";
// Types
import type { UseChatStoreTypes } from './useChatStore.types.ts';
import type { AxiosError } from "axios";

export const useChatStore = create<UseChatStoreTypes>((set) => ({
    messages: [],
    users: [],
    selectedUser: [],
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data })

        } catch (error) {
            const e = error as AxiosError<{ message: string}>
            toast.error(e.response?.data?.message ?? e.message)
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId: string) => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data })
        } catch (error) {
            const e = error as AxiosError<{ message: string}>;
            toast.error(e.response?.data?.message ?? e.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
}));