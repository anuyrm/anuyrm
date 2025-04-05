// ✅ src/components/CustomerForm.tsx
import {
    Box, Button, FormControl, FormLabel, FormErrorMessage, Input, Stack, Flex
  } from '@chakra-ui/react';
  import { useEffect } from 'react';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import {
    editBannerProps,
    formStackProps,
    formWrapperProps
  } from '../styles/customerForm.styles';
  
  const postcodeRegex = /^[A-Za-z0-9\s\-]{5,10}$/;
  
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      county: z.string().optional(),
      postcode: z.string()
        .min(1, 'Postcode is required')
        .regex(postcodeRegex, 'Invalid postcode format'),
    }),
  });
  
  type CustomerFormData = z.infer<typeof schema>;
  
  const emptyCustomer: CustomerFormData = {
    name: '',
    address: {
      street: '',
      city: '',
      county: '',
      postcode: '',
    },
  };
  
  interface CustomerFormProps {
    selectedCustomer: CustomerFormData;
    onSave: (customer: CustomerFormData) => void;
    onCancelEdit: () => void;
  }
  
  const CustomerForm: React.FC<CustomerFormProps> = ({
    selectedCustomer,
    onSave,
    onCancelEdit
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<CustomerFormData>({
      resolver: zodResolver(schema),
      defaultValues: emptyCustomer,
    });
  
    useEffect(() => {
      reset(selectedCustomer || emptyCustomer);
    }, [selectedCustomer, reset]);
  
    const handleCancel = () => {
      reset(emptyCustomer);
      onCancelEdit();
    };
  
    const onSubmit = (data: CustomerFormData) => {
      const merged = { ...selectedCustomer, ...data };
      onSave(merged);
      reset();
    };
  
    return (
      <Box {...formWrapperProps} onSubmit={handleSubmit(onSubmit)}>
        {selectedCustomer?.address?.postcode && (
          <Flex {...editBannerProps}>
            <Box>
              Editing <strong>{selectedCustomer.name}</strong>
            </Box>
            <Button size="sm" variant="ghost" colorScheme="red" onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        )}
  
        <Stack {...formStackProps}>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Name</FormLabel>
            <Input {...register('name')} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={!!errors.address?.street}>
            <FormLabel>Street</FormLabel>
            <Input {...register('address.street')} />
            <FormErrorMessage>{errors.address?.street?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={!!errors.address?.city}>
            <FormLabel>City</FormLabel>
            <Input {...register('address.city')} />
            <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={!!errors.address?.county}>
            <FormLabel>County</FormLabel>
            <Input {...register('address.county')} />
            <FormErrorMessage>{errors.address?.county?.message}</FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={!!errors.address?.postcode} isRequired>
            <FormLabel>Postcode</FormLabel>
            <Input {...register('address.postcode')} />
            <FormErrorMessage>{errors.address?.postcode?.message}</FormErrorMessage>
          </FormControl>
  
          <Button type="submit" colorScheme="teal">
            {selectedCustomer?.address?.postcode ? 'Update' : 'Create'} Customer
          </Button>
        </Stack>
      </Box>
    );
  };
  
  export default CustomerForm;
  