'use client'

// Core
import {FC} from 'react';
import Link from "next/link";
// Components
import {
    Container,
    VStack,
    Text
} from "@chakra-ui/react";

const Home: FC = () => {
    return (
        <Container
            maxW='container.xl'
            py={12}
        >
            <VStack spacing={8}>
                <Text
                    fontSize={30}
                    fontWeight='bold'
                    bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip='text'
                    textAlign='center'
                >
                    Current Product 🚀
                </Text>
                <Text
                    fontSize='xl'
                    textAlign='center'
                    fontWeight='bold'
                    color='gray.500'
                >
                    No products found 😢
                    <Link href='/create'>
                        <Text
                            as='span'
                            color='blue.500'
                            _hover={{textDecoration: 'underline'}}
                        >
                            Create a product
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
}

export default Home;
