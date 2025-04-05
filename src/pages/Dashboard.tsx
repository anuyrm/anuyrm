
import { Box, Heading } from '@chakra-ui/react';
import { Customer } from '../types';
import CustomerMap from '../components/map/CustomerMap';
import CustomerCityStats from '../components/map/CustomerCityStats';

interface DashboardProps {
  customers: Customer[];
}

const Dashboard: React.FC<DashboardProps> = ({ customers }) => {
  return (
    <Box>
      <Heading size="md" mb={4}>Customer Map</Heading>
      <CustomerMap customers={customers} />

      <Box mt={10}>
        <CustomerCityStats customers={customers} />
      </Box>
    </Box>
  );
};

export default Dashboard;
