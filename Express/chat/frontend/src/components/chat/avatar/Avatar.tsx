// Core
import { FC } from 'react';
// Store
import {useChatStore} from "../../../store/chat/useChatStore.ts";

const Avatar: FC = () => {
    const { selectedUser } = useChatStore();
    return (
        <div className="avatar">
            <div className="size-10 rounded-full relative">
                <img src={selectedUser?.profilePicture || "/avatar.png"} alt={selectedUser?.fullName} />
            </div>
        </div>
    );
}

export default Avatar;