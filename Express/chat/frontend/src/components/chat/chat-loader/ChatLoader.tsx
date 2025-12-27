// Core
import { FC } from 'react';
// Components
import { ChatHeader, MessageInput } from "../";
import { MessageSkeleton } from "../..";

const ChatLoader: FC = () => {
    return (
        <div className='flex-1 flex flex-col'>
            <div className='shrink-0'>
                <ChatHeader />
            </div>
            <div className='flex-1 overflow-y-auto'>
                <MessageSkeleton />
            </div>
            <div className='shrink-0'>
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatLoader;
