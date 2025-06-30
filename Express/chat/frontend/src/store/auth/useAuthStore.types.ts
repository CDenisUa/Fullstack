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
    isSigningUp: boolean,
    isLoggedIn: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
}

export interface AuthActions {
    checkAuth: () => Promise<void>;
    signUp: () => Promise<void>;
    setAuthUser?: (u: AuthUser | null) => void;
}

export type UseAuthStore = AuthActions & AuthState;