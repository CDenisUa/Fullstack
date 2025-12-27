// Types
import { AuthState } from "../store/auth/useAuthStore.types.ts";

export const chatEndOrStart = (senderId: string, authUser: AuthState['authUser']) => {
    return senderId === authUser?._id ? 'chat-end' : 'chat-start'
}
