
import {
  Box, Button, FormControl, FormLabel, FormErrorMessage, Input, Stack, Flex
} from '@chakra-ui/react';
import { Product } from '../../types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editBannerProps, formWrapperProps } from '../styles/productForm.styles';

interface ProductFormProps {
  selectedProduct: Product;
  onSave: (product: Product) => void;
  onCancelEdit: () => void;
}

const schema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().max(255, 'Description must be at most 255 characters').optional(),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0.01, 'Price must be greater than 0'),
});

type ProductFormData = z.infer<typeof schema>;
const emptyProduct: Product = { sku: '', description: '', price: 0 };

const ProductForm: React.FC<ProductFormProps> = ({ selectedProduct, onSave, onCancelEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: emptyProduct,
  });

  useEffect(() => {
    reset(selectedProduct || emptyProduct);
  }, [selectedProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    const merged = { ...selectedProduct, ...data };
    onSave(merged);
    reset();
  };
  const handleCancel = () => {
    reset(emptyProduct);
    onCancelEdit();
  };
  

  return (
    <Box {...formWrapperProps} onSubmit={handleSubmit(onSubmit)}>
      {selectedProduct?.id && (
        <Flex {...editBannerProps}>
          <Box>
              Editing <strong>{selectedProduct.sku}</strong> (ID: {selectedProduct.id})
          </Box>
          <Button size="sm" variant="ghost" colorScheme="red" onClick={handleCancel}>
              Cancel
          </Button>
        </Flex>
      )}


      <Stack spacing={4} mb={6}>
        <FormControl isInvalid={!!errors.sku} isRequired>
          <FormLabel htmlFor="sku">SKU</FormLabel>
          <Input id="sku" {...register('sku')} />
          <FormErrorMessage>{errors.sku?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.price} isRequired>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          {selectedProduct?.id ? 'Update' : 'Create'} Product
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductForm;
