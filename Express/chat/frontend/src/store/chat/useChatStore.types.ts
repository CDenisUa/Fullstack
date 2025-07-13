export interface UseChatStoreTypes {
    messages: [],
    users: [],
    selectedUser: [],
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>,
}