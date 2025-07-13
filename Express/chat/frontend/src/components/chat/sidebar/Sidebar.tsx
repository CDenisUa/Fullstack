// Core
import { FC, useEffect } from 'react';
// Store
import { useChatStore } from "../../../store/chat/useChatStore.ts";
// Components
import { SidebarSkeleton } from '../../../components/chat';

const Sidebar: FC = () => {
    const {
        getUsers,
        // users,
        // selectedUser,
        // setSelectedUser,
        isUsersLoading
    } = useChatStore();

    // const onlineUsers = [];

    useEffect(() => {
        getUsers().catch(error => console.error(error));
    }, [getUsers]);

    if(isUsersLoading) return <SidebarSkeleton quantity={8} />;

    return (
        <div>Sidebar</div>
    );
}

export default Sidebar;