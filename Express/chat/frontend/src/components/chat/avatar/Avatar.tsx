// Core
import { FC } from 'react';
// Store
import {useChatStore} from "../../../store/chat/useChatStore.ts";

const Avatar: FC = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className="avatar">
            <div className="size-10 rounded-full overflow-hidden border">
                <img
                    src={selectedUser?.profilePicture || "/avatar.png"}
                    alt={selectedUser?.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                />
            </div>
        </div>
    );
}

export default Avatar;
