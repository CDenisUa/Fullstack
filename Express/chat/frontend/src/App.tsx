// Core
import {FC, useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import { Loader } from 'lucide-react';
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


const App: FC = () => {
    const {
        authUser,
        checkAuth,
        isCheckingAuth
    } = useAuthStore();

    console.log(authUser)
    console.log(checkAuth)

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    if(isCheckingAuth && !authUser) return (
        <div>
            <Loader className="size-10 animate-spin" />
        </div>
    )

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="login" /> } />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="login" />} />
            </Routes>
        </div>
    );
}

export default App;