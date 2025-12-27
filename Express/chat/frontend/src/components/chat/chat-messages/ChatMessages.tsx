// Core
import { FC } from 'react';
// Store
import { useAuthStore } from "../../../store/auth/useAuthStore.ts";
import { useChatStore } from "../../../store/chat/useChatStore";
// Utils
import { chatEndOrStart } from "../../../utils/chat.ts";
import { formatMessageTime } from "../../../utils/formatters.ts";

const ChatMessages: FC = () => {
    const { messages, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();

    return (
        <div>
            {
                messages.map(message => (
                    <div
                        key={message['_id']}
                        className={`chat px-[10px] ${chatEndOrStart(message.senderId, authUser)}`}
                    >
                        <div className="chat-image avatar">
                            <div
                                className='size-10 rounded-full border'
                            >
                                <img
                                    src={
                                        message.senderId === authUser?._id
                                            ? authUser?.profilePicture || '/avatar.png'
                                            : selectedUser?.profilePicture || '/avatar.png'
                                    }
                                    alt="Profile"
                                    onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message?.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {
                                message.image && (
                                    <img
                                        src={message.image}
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                        alt='Attachment'
                                    />
                                )
                            }
                            {
                                message.text && (
                                    <span>{message.text}</span>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ChatMessages;
