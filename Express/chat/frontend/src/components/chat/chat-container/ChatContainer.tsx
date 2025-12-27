// Core
import {FC} from 'react';
// Store
import { useChatStore } from "../../../store/chat/useChatStore";
// Hooks
import { useFetchMessages } from "../../../hooks";
// Components
import {
    ChatHeader,
    MessageInput,
    ChatMessages,
    ChatLoader,
} from '../../chat'

const ChatContainer: FC = () => {
    const { getMessages, selectedUser, isMessagesLoading } = useChatStore();

    useFetchMessages(selectedUser, getMessages);

    if(isMessagesLoading) return <ChatLoader />

    return (
        <div className='flex-1 flex flex-col'>
            <div className='shrink-0'>
                <ChatHeader />
            </div>
            <div className='flex-1 overflow-y-auto'>
                <ChatMessages />
            </div>
            <div className='shrink-0'>
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatContainer;
