
import { Product } from '../../types';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, TableContainer
} from '@chakra-ui/react';
import { formatPrice } from '../../utils/formatPrice';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead bg="gray.100">
          <Tr>
            <Th>ID</Th>
            <Th>SKU</Th>
            <Th>Description</Th>
            <Th isNumeric>Price</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.sku}</Td>
              <Td>{product.description || '-'}</Td>
              <Td isNumeric>{formatPrice(product.price)}</Td>
              <Td textAlign="center">
                <Button size="xs" colorScheme="blue" onClick={() => onEdit(product)}>
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
