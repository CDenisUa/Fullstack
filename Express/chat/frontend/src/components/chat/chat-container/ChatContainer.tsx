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

const ChatContainer: FC = () => {
    const { getMessages, selectedUser, isMessagesLoading } = useChatStore();

    useFetchMessages(selectedUser, getMessages);

    if(isMessagesLoading) return <div>Loading...</div>

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <p>Messages...</p>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;