'use client'
// Core
import {FC} from 'react';
import {SessionProvider} from 'next-auth/react';
// Types
import {ProviderPropTypes} from "./Provider.types";

const Provider: FC<ProviderPropTypes> = (props) => {
    const {children, session} = props;
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}

export default Provider;