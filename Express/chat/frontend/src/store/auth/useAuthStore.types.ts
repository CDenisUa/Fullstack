export interface AuthUser {
    _id: string;
    email: string;
    fullName: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    authUser: AuthUser | null,
    onlineUsers: string[],
    isSigningUp: boolean,
    isLoggedIn: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    socket: import("socket.io-client").Socket | null,
}

export interface UploadProfileTypes {
    profilePicture: string | ArrayBuffer | null,
}

export interface AuthActions {
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpForm) => Promise<void>;
    setAuthUser?: (user: AuthUser | null) => void;
    setIsCheckingAuth?: (value: boolean) => void;
    logIn: (data: LoginTypes) => Promise<void>;
    updateProfile: (data: UploadProfileTypes) => Promise<void>;
    logOut: () => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

export type UseAuthStoreType = AuthActions & AuthState;
