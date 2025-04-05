
import { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, Spinner
} from '@chakra-ui/react';
import { Customer } from '../../types';
import { getCityFromPostcode } from '../../services/geoService';

interface Props {
  customers: Customer[];
}

const CustomerCityStats: React.FC<Props> = ({ customers }) => {
  const [stats, setStats] = useState<{ city: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const groupByCity = async () => {
      const cityCounts: Record<string, number> = {};

      for (const customer of customers) {
        const postcode = customer.address?.postcode;
        if (postcode) {
          const city = await getCityFromPostcode(postcode);
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        }
      }

      const result = Object.entries(cityCounts).map(([city, count]) => ({ city, count }));
      setStats(result);
      setLoading(false);
    };

    groupByCity();
  }, [customers]);

  if (loading) return <Spinner size="lg" />;

  return (
    <>
      <Heading size="md" mb={4}>Customer Count by City (via Nominatim)</Heading>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr><Th>City</Th><Th isNumeric>Customer Count</Th></Tr>
          </Thead>
          <Tbody>
            {stats.map(({ city, count }) => (
              <Tr key={city}>
                <Td>{city}</Td>
                <Td isNumeric>{count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerCityStats;
