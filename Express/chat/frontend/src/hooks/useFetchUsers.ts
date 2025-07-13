// Core
import { useEffect } from 'react';
// Store
import { useChatStore } from '../store/chat/useChatStore';

const useFetchUsers = (): void => {
    const { getUsers } = useChatStore();

    useEffect(() => {
        getUsers().catch(error => console.error("Failed to fetch users:", error));
    }, [getUsers]);
}

export default useFetchUsers;