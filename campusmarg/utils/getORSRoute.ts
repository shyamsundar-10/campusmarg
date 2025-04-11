// utils/getORSRoute.ts
import { ORS_API_KEY } from '../env';
import { LatLng } from 'react-native-maps';

export async function getORSRoute(coords: LatLng[]): Promise<LatLng[]> {
  const formattedCoords = coords.map(c => [c.longitude, c.latitude]);

  const body = {
    coordinates: formattedCoords,
    format: 'geojson',
  };

  const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
    method: 'POST',
    headers: {
      'Authorization': ORS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  const path: LatLng[] = data.features[0].geometry.coordinates.map((coord: number[]) => ({
    latitude: coord[1],
    longitude: coord[0],
  }));

  return path;
}
