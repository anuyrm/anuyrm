
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
  } from '@chakra-ui/react';
  import { Customer } from '../../types';
  
  interface CustomerListProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
  }
  
  const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit }) => {
    return (
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>County</Th>
              <Th>Postcode</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.id}</Td>
                <Td>{customer.name}</Td>
                <Td>{customer.address?.city || '-'}</Td>
                <Td>{customer.address?.county || '-'}</Td> {/* ✅ County column */}
                <Td>{customer.address?.postcode || '-'}</Td>
                <Td>
                  <Button size="xs" onClick={() => onEdit(customer)} colorScheme="blue">
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
  
  export default CustomerList;
  