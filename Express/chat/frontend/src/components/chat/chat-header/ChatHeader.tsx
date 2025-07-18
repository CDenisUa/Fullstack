// Core
import { FC } from 'react';
import { X } from "lucide-react";
// Store
import {useChatStore} from "../../../store/chat/useChatStore.ts";
import {useAuthStore} from "../../../store/auth/useAuthStore.ts";
// Components
import { Avatar } from '../';

const ChatHeader: FC = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar />
                    <div>
                        <h3 className="font-medium">{selectedUser?.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser?._id ?? '') ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;