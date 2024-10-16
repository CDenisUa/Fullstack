'use client'

// Core
import {FC, useState, ChangeEvent} from 'react';
// Store
import {
    useProductStore,
} from '@/store';
// Components
import {
    Box,
    Button,
    Container,
    Heading,
    Input, useToast,
    VStack
} from "@chakra-ui/react";
import {useColorModeValue} from "@chakra-ui/icons";

const CreatePage: FC = () => {
    const { createProduct } = useProductStore();
    const toast = useToast();

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const updateProductField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    }

    const addProductHandle = async () => {
        const { success, message } = await createProduct(newProduct);

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true,
            });
        }
    }

    return (
        <Container
            maxW='container.sm'
        >
            <VStack
                spacing={8}
            >
                <Heading
                    as='h1'
                    size='2xl'
                    textAlign='center'
                    mb={8}
                >
                    Create new Product
                </Heading>
                <Box
                    w='full'
                    bg={useColorModeValue('white', 'gray.800')}
                    p={6}
                    rounded='lg'
                    shadow='md'
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={updateProductField}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={updateProductField}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={updateProductField}
                        />
                        <Button
                            w='full'
                            colorScheme='blue'
                            onClick={addProductHandle}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage;