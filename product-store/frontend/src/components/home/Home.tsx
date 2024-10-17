'use client'

// Core
import {FC, useEffect} from 'react';
import Link from "next/link";
// Store
import {useProductStore} from "@/store";
// Components
import {
    Container,
    VStack,
    Text, SimpleGrid
} from "@chakra-ui/react";

const Home: FC = () => {
    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts();
    },[fetchProducts])

    console.log('products', products)
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
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w='full'
                >

                </SimpleGrid>
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
