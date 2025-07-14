// Core
import { useEffect } from 'react';
// Types
import type { UseChatStoreTypes } from "../store/chat/useChatStore.types";

const useFetchMessages = (
    selectedUser: UseChatStoreTypes['selectedUser'],
    getMessages: UseChatStoreTypes['getMessages']
): void => {
    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id).catch((error) =>
                console.error('Failed to fetch messages:', error)
            );
        }
    }, [selectedUser?._id, getMessages]);
};

export default useFetchMessages;