export interface UseChatStoreTypes {
    messages: [],
    users: [],
    selectedUser: UserTypes | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    onlineUsers: string[],
    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>,
    setSelectedUser: (user: UserTypes) => void,
}

export interface UserTypes {
    _id: string,
    email: string,
    fullName: string,
    profilePicture: string,
}