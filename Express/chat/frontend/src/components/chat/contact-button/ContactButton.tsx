// Core
import {FC, memo} from 'react';
// Types
import type { ContactButtonPropTypes } from './ContactButton.types';
// Store
import {useChatStore} from "../../../store/chat/useChatStore";

const ContactButton: FC<ContactButtonPropTypes> = ({ user }) => {
    const {
        _id,
        profilePicture,
        fullName
    } = user;

    const { setSelectedUser, onlineUsers, selectedUser } = useChatStore();

    return (
        <button
            key={_id}
            className={`
                w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                ${ _id === selectedUser?._id && "bg-base-300 ring-1 ring-base-300" }
            `}
            onClick={() => setSelectedUser(user)}
        >
            <div className='relative mx-auto lg:mx-0'>
                <img
                    src={profilePicture || "/avatar.png"}
                    alt={fullName}
                    className='size-12 object-cover rounded-full'
                />
                {
                    onlineUsers.includes(_id) &&
                    <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'/>
                }
            </div>
            <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>{ fullName }</div>
                <div>{ onlineUsers.includes(_id) ? "Online" : "Offline" }</div>
            </div>
        </button>
    );
}

export default memo(ContactButton);