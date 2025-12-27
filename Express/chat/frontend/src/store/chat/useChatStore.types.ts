export interface UseChatStoreTypes {
    messages: MessageType[],
    users: [],
    selectedUser: UserTypes | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    onlineUsers: string[],
    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>,
    setSelectedUser: (user: UserTypes | null) => void,
    sendMessage: (messageData: SendMessagePayload) => void,
}

export interface UserTypes {
    _id: string,
    email: string,
    fullName: string,
    profilePicture: string,
}

export interface MessageType {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: string | null;
    createdAt: string;
}

export interface SendMessagePayload {
    text: string;
    image: string | null;
}
