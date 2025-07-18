// Core
import { FC } from 'react';
// Components
import { ChatHeader, MessageInput } from "../";
import { MessageSkeleton } from "../..";

const ChatLoader: FC = () => {
    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    );
}

export default ChatLoader;