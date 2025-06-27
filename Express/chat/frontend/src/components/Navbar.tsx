// Core
import { FC } from 'react';
// Store
import {useAuthStore} from "../store/auth/useAuthStore";

const Navbar: FC = () => {
    const { authUser } = useAuthStore();
    console.log(authUser)

    return (
        <div>
            <div className="p-4 bg-red-300">Test</div>
        </div>
    );
}

export default Navbar;