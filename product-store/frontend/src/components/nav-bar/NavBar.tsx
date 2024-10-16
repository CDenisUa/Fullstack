'use client'

// Core
import {FC} from 'react';
import Link from "next/link";
import {
    PlusSquareIcon,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/icons";
// Images
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
// Store
import { useProductStore } from '@/store';
// Components
import {
    Button,
    Container,
    Flex,
    HStack,
    Text
} from "@chakra-ui/react";

const NavBar: FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const { products, setProducts } = useProductStore();
    return (
        <Container
            maxW='1140px'
            px={4}
        >
            <Flex
                h={16}
                alignItems='center'
                justifyContent='space-between'
                flexDir={{
                    base: 'column',
                    sm: 'row'
                }}
            >
                <Text
                    fontSize={{base: '22', sm: '28'}}
                    fontWeight="bold"
                    textTransform='uppercase'
                    textAlign='center'
                    bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip='text'
                >
                    <Link href='/'>
                        Product Store 🛒
                    </Link>
                </Text>
                <HStack
                    spacing={2}
                    alignItems='center'
                >
                    <Link href='/create'>
                        <Button>
                            <PlusSquareIcon/>
                        </Button>
                    </Link>
                    <Button
                        onClick={toggleColorMode}
                    >
                        {colorMode === 'light'
                            ? <IoMoon/>
                            : <LuSun size={20}/>
                        }
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default NavBar;