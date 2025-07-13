// Core
import { FC } from 'react';
import { Users } from "lucide-react";
// Store
import { useChatStore } from "../../../store/chat/useChatStore.ts";
// Hooks
import { useFetchUsers } from "../../../hooks"
// Components
import { SidebarSkeleton, Contacts } from '../../../components/chat';

const Sidebar: FC = () => {
    const {
        users,
        // selectedUser,
        // setSelectedUser,
        isUsersLoading
    } = useChatStore();

    // const onlineUsers = [];

    useFetchUsers();

    if(isUsersLoading) return <SidebarSkeleton quantity={8} />;

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className="size-6" />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
            </div>
            <Contacts
                users={users}
            />
        </aside>
    );
}

export default Sidebar;