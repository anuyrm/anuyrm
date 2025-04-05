
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Customer } from '../../types';
import { getCityFromPostcode } from '../../services/geoService';
import { getLatLngFromPostcode } from '../../services/geoService';
import { Box, Input } from '@chakra-ui/react';
import {
  mapInputStyle,
  mapWrapperStyle,
  tileLayerUrl,
  tileLayerAttribution
} from '../styles/customerMap.styles';

interface Props {
  customers: Customer[];
}

const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

const CustomerMap: React.FC<Props> = ({ customers }) => {
  const [markers, setMarkers] = useState<{ customer: Customer; coords: [number, number] }[]>([]);
  const [postcodeFilter, setPostcodeFilter] = useState('');

  useEffect(() => {
    const loadMarkers = async () => {
      const filtered = postcodeFilter
        ? customers.filter(c => c.address?.postcode?.startsWith(postcodeFilter))
        : customers;

      const resolved = await Promise.all(
        filtered.map(async (customer) => {
          try {
            const coords = await getLatLngFromPostcode(customer.address?.postcode || '');
            return { customer, coords };
          } catch {
            return null;
          }
        })
      );

      setMarkers(resolved.filter(Boolean) as { customer: Customer; coords: [number, number] }[]);
    };

    loadMarkers();
  }, [customers, postcodeFilter]);

  return (
    <Box>
      <Input
        placeholder="Filter by postcode (e.g. SW1)"
        value={postcodeFilter}
        onChange={(e) => setPostcodeFilter(e.target.value)}
        {...mapInputStyle}
      />

      <MapContainer {...mapWrapperStyle}>
        <MapResizer />
        <TileLayer attribution={tileLayerAttribution} url={tileLayerUrl} />

        {markers.map(({ customer, coords }, index) => (
          <Marker key={index} position={coords}>
            <Popup>
              {customer.name}<br />
              {customer.address?.postcode}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default CustomerMap;
