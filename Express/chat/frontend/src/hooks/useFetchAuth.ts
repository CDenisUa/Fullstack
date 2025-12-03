// Core
import { useEffect } from "react";
// Store
import { useAuthStore } from "../store/auth/useAuthStore.ts";

const useFetchAuth = (enabled: boolean = true): void => {
    const { checkAuth, setIsCheckingAuth } = useAuthStore();

    useEffect(() => {
        if (enabled) {
            checkAuth().catch(() => {});
        } else {
            setIsCheckingAuth?.(false);
        }
    }, [enabled, checkAuth, setIsCheckingAuth])
}

export default  useFetchAuth;
