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
    sendMessage: (messageData: MessageType) => void,
}

export interface UserTypes {
    _id: string,
    email: string,
    fullName: string,
    profilePicture: string,
}

export interface MessageType {
    text: string;
    image: string | null;
}