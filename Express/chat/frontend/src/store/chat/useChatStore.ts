// Core
import { create } from "zustand";
import toast from 'react-hot-toast';
// Lib
import { axiosInstance } from "../../lib/axios.ts";
// Types
import type { UseChatStoreTypes, UserTypes } from './useChatStore.types.ts';
import type { AxiosError } from "axios";

export const useChatStore = create<UseChatStoreTypes>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    onlineUsers: [],

    setSelectedUser: (selectedUser: UserTypes | null) => set({ selectedUser }),
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
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            const e = error as AxiosError<{ message: string}>;
            toast.error(e.response?.data?.message ?? e.message);
        } 
    }
}));
