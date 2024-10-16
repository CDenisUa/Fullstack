'use client'

// Core
import { FC, PropsWithChildren } from 'react';
import {useColorModeValue} from "@chakra-ui/icons";
// Components
import {Box} from "@chakra-ui/react";

const AppContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')}>
            {children}
        </Box>
    );
}

export default AppContainer;