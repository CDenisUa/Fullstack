// Core
import {FC} from 'react';
// Store
import { useChatStore } from "../../../store/chat/useChatStore";
// Hooks
import { useFetchMessages } from "../../../hooks";
// Components
import {
    ChatHeader,
    MessageInput
} from '../../chat'
import ChatLoader from "../chat-loader/ChatLoader.tsx";

const ChatContainer: FC = () => {
    const { getMessages, selectedUser, isMessagesLoading } = useChatStore();

    useFetchMessages(selectedUser, getMessages);

    if(isMessagesLoading) return <ChatLoader />

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <p>Messages...</p>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;