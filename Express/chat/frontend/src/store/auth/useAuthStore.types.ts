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

export interface UploadProfileTypes {
    profilePicture: string | ArrayBuffer | null,
}

export type AuthStorePersist = UseAuthStoreType & {
    authUser: UseAuthStoreType["authUser"];
};

export interface AuthActions {
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpForm) => Promise<void>;
    setAuthUser?: (user: AuthUser | null) => void;
    logIn: (data: LoginTypes) => Promise<void>;
    updateProfile: (data: UploadProfileTypes) => Promise<void>;
    logOut: () => Promise<void>;
}

export type UseAuthStoreType = AuthActions & AuthState;

