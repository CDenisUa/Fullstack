// Core
import { useEffect } from "react";
// Store
import { useAuthStore } from "../store/auth/useAuthStore.ts";

const useFetchAuth = (): void => {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth().catch((error) => console.error("Failed to fetch check auth:", error));
    }, [checkAuth])
}

export default  useFetchAuth;