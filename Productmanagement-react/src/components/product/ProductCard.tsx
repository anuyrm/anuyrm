// src/components/ProductCard.tsx
import { Product } from '../../types';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  return (
    <Flex
      justify="space-between"
      align="flex-start"
      mb={3}
      p={3}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
      _hover={{ bg: 'gray.50' }}
    >
      <Box>
        <Text fontWeight="bold" fontSize="lg">{product.sku}</Text>
        <Text>ID: {product.id}</Text>
        {product.description?.trim() && (
          <Text>Description: {product.description}</Text>
        )}
        <Text>Price: ${product.price.toFixed(2)}</Text>
      </Box>
      <Button size="sm" onClick={() => onEdit(product)}>Edit</Button>
    </Flex>
  );
};

export default ProductCard;
