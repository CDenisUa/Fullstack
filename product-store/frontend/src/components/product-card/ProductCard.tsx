'use client'

// Core
import {ChangeEvent, FC, useState} from 'react';
import {
    DeleteIcon,
    EditIcon,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/icons";
// Types
import {ProductCardPropTypes} from './ProductCard.types';
import {Product} from "@/store/product/product.types";
// Store
import {useProductStore} from "@/store";
// Components
import {
    VStack,
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import CustomModal from "@/components/custom-modal/CustomModal";

const ProductCard: FC<ProductCardPropTypes> = (props) => {
    const toast = useToast();
    const {product} = props;

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure();
    const {
        deleteProduct,
        updateProduct
    } = useProductStore();

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

    const deleteProductHandle = async (id: string | undefined) => {
        const {success, message} = await deleteProduct(id);
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    };

    const updateProductHandle = async (id: string | undefined, updatedProduct: Product) => {
        if(!id || !updatedProduct) return
        const { success, message } = await updateProduct(id, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Success',
                description: 'Product updated successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    };

    const changeUpdateHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value
        })
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            bg={bg}
            _hover={{
                transform: 'translateY(-5px)',
                shadow: 'xl'
            }}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w='full'
                objectFit='cover'
            />
            <Box p={4}>
                <Heading
                    as='h3'
                    size='md'
                    mb={2}
                >
                    {product.name}
                </Heading>
                <Text
                    fontWeight='bold'
                    fontSize='xl'
                    color={textColor}
                    mb={4}
                >
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton
                        onClick={onOpen}
                        icon={<EditIcon/>}
                        colorScheme='blue'
                        aria-label='Edit product'
                    />
                    <IconButton
                        onClick={() => deleteProductHandle(product._id)}
                        icon={<DeleteIcon/>}
                        colorScheme='red'
                        aria-label='Delete product'
                    />
                </HStack>
            </Box>
            <CustomModal
                title='Update product'
                isOpen={isOpen}
                onClose={onClose}
                footer={
                    <>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => updateProductHandle(product['_id'], updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </>
                }
            >
                <VStack spacing={4}>
                    <Input
                        placeholder='Product Name'
                        name='name'
                        value={updatedProduct.name}
                        onChange={changeUpdateHandle}
                    />
                    <Input
                        placeholder='Price'
                        name='price'
                        value={updatedProduct.price}
                        onChange={changeUpdateHandle}
                    />
                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={updatedProduct.image}
                        onChange={changeUpdateHandle}
                    />
                </VStack>
            </CustomModal>
        </Box>
    );
}

export default ProductCard;