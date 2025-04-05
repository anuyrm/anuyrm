// src/services/geoService.ts

const postcodeCityCache = new Map<string, string>();

export const getCityFromPostcode = async (postcode: string): Promise<string> => {
  if (postcodeCityCache.has(postcode)) {
    return postcodeCityCache.get(postcode)!;
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(postcode)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'customer-dashboard-app/1.0' }
    });

    const data = await res.json();

    const address = data[0]?.address;
    const city = address?.city || address?.town || address?.village || address?.county || 'Unknown';

    postcodeCityCache.set(postcode, city);
    return city;
  } catch (err) {
    console.error(`Error fetching city for postcode: ${postcode}`, err);
    return 'Unknown';
  }
};

export const getLatLngFromPostcode = async (postcode: string): Promise<[number, number]> => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'customer-dashboard-app/1.0' }
    });

    const data = await res.json();

    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      return [lat, lon];
    }

    throw new Error('No coordinates found for postcode');
  } catch (err) {
    console.error(`Error resolving coordinates for postcode: ${postcode}`, err);
    throw err;
  }
};
