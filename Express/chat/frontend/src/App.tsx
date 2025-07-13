// Core
import {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { Loader } from 'lucide-react';
// Store
import { useAuthStore } from "./store/auth/useAuthStore";
import { useThemeStore } from "./store/theme/useThemeStore.ts";
// Hooks
import { useAuth } from "./hooks"
// Components
import {
    Navbar,
} from './components';
import {
    HomePage,
    SignUpPage,
    LoginPage,
    SettingsPage,
    ProfilePage
} from './pages'

const App: FC = () => {
    const {
        authUser,
        isCheckingAuth
    } = useAuthStore();

    const { theme } = useThemeStore();

    useAuth();

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;