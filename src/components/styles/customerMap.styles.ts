

import { InputProps } from '@chakra-ui/react';
import { MapContainerProps } from 'react-leaflet';

export const mapInputStyle: InputProps = {
  mb: 4,
  maxW: '300px',
  placeholder: 'Filter by postcode',
};

export const mapWrapperStyle: MapContainerProps = {
  center: [51.5, -0.12],
  zoom: 6,
  style: { height: '400px', width: '100%' },
};

export const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const tileLayerAttribution = '&copy; OpenStreetMap contributors';
