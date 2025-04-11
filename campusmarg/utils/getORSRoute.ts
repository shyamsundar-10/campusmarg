import axios from "axios";
import { ORS_API_KEY } from "../env";

type ORSCoord = {
  latitude: number;
  longitude: number;
};

export const getORSRoute = async (coords: ORSCoord[]): Promise<ORSCoord[]> => {
  try {
    const body = {
      coordinates: coords.map((c) => [c.longitude, c.latitude]),
    };

    const res = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      body,
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const points = res.data.features[0].geometry.coordinates;
    return points.map(([lon, lat]: [number, number]) => ({
      latitude: lat,
      longitude: lon,
    }));
  } catch (error) {
    console.error("ORS Route Error:", error);
    return [];
  }
};
