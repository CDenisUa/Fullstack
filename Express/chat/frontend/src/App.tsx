// Core
import {FC, useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
// Store
import { useAuthStore } from "./store/auth/useAuthStore";
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
import { Loader } from 'lucide-react';

const App: FC = () => {
    const {
        authUser,
        checkAuth,
        isCheckingAuth
    } = useAuthStore();

    useEffect(() => {
        checkAuth().catch((error) => console.log(error));
    }, [checkAuth])

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );

    return (
        <div>
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