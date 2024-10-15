'use client';

// Core
import { FC, PropsWithChildren} from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return <ChakraProvider>{children}</ChakraProvider>
}