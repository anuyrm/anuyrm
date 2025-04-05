// ✅ Fixed src/App.tsx with consistent Customer typing
import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { getProducts, saveProduct } from './services/productService';
import { getCustomers, saveCustomer } from './services/customerService';

import { Product, Customer } from './types';
import ProductForm from './components/product/ProductForm';
import ProductList from './components/product/ProductList';
import CustomerForm from './components/customer/CustomerForm';
import CustomerList from './components/customer/CustomerList';
import Dashboard from './pages/Dashboard';

const emptyProduct: Product = { sku: '', description: '', price: 0 };
const emptyCustomer: Customer = {
  name: '',
  address: {
    street: '',
    city: '',
    county: '',
    postcode: '',
  },
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(emptyProduct);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(emptyCustomer);

  const loadProducts = async () => setProducts(await getProducts());
  const loadCustomers = async () => setCustomers(await getCustomers());

  const handleSaveProduct = async (product: Product) => {
    await saveProduct(product);
    setSelectedProduct(emptyProduct);
    loadProducts();
  };

  const handleSaveCustomer = async (customer: Customer) => {
    await saveCustomer(customer);
    setSelectedCustomer(emptyCustomer);
    loadCustomers();
  };

  const normalizeCustomer = (c: Customer): Customer => ({
    name: c.name || '',
    address: {
      street: c.address?.street || '',
      city: c.address?.city || '',
      county: c.address?.county || '',
      postcode: c.address?.postcode || '',
    },
  });

  useEffect(() => {
    loadProducts();
    loadCustomers();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={6}>Inventory Manager</Heading>

      <Tabs variant="enclosed" colorScheme="teal" isFitted>
        <TabList>
          <Tab>Products</Tab>
          <Tab>Customers</Tab>
          <Tab>Dashboard</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>Product Management</Heading>
            <ProductForm
              selectedProduct={selectedProduct}
              onSave={handleSaveProduct}
              onCancelEdit={() => setSelectedProduct(emptyProduct)}
            />
            <Divider my={4} />
            <ProductList
              products={products}
              onEdit={setSelectedProduct}
            />
          </TabPanel>

          <TabPanel>
            <Heading size="md" mb={4}>Customer Management</Heading>
            <CustomerForm
              selectedCustomer={selectedCustomer}
              onSave={handleSaveCustomer}
              onCancelEdit={() => setSelectedCustomer(emptyCustomer)}
            />
            <Divider my={4} />
            <CustomerList
              customers={customers}
              onEdit={(c) => setSelectedCustomer(normalizeCustomer(c))}
            />
          </TabPanel>

          <TabPanel>
            <Heading size="md" mb={4}>Customer Dashboard</Heading>
            <Dashboard customers={customers} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;