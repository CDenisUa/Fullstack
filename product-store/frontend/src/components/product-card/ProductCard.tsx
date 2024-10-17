// Core
import { FC } from 'react';
import {
    DeleteIcon,
    EditIcon,
    useColorModeValue
} from "@chakra-ui/icons";
// Types
import { ProductCardPropTypes } from './ProductCard.types';
// Components
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";

const ProductCard: FC<ProductCardPropTypes> = (props) => {
    const { product } = props;
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

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
                        icon={<EditIcon />}
                        colorScheme='blue'
                        aria-label='Edit product'
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        aria-label='Delete product'
                    />
                </HStack>
            </Box>
        </Box>
    );
}

export default ProductCard;