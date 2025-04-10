import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Users from "../assets/Users.json";
import * as Location from "expo-location";

// Type for coordinates with name
type Coord = {
  latitude: number;
  longitude: number;
  name: string;
};

// Calculate distance using haversine formula
const haversineDistance = (a: Coord, b: Coord): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const aCalc =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return R * c;
};

const HomeDriver = () => {
  const [driverLocation, setDriverLocation] = useState<Coord | null>(null);
  const [studentCoords, setStudentCoords] = useState<Coord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Load and filter student data
      const students = Users.filter((u: any) => u.usertype === "student");

      const coords: Coord[] = [];

      for (const s of students) {
        const latStr = s?.address?.latitude;
        const lonStr = s?.address?.longitude;

        const lat = Number(latStr);
        const lon = Number(lonStr);

        if (!isNaN(lat) && !isNaN(lon)) {
          coords.push({
            latitude: lat,
            longitude: lon,
            name: s.name,
          });
        }
      }

      setStudentCoords(coords);

      // Get driver location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setDriverLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        name: "You (Driver)",
      });
    };

    loadData();
  }, []);

  if (!driverLocation || studentCoords.length === 0) return null;

  // Generate route using nearest neighbor algorithm
  const route: Coord[] = [driverLocation];
  const remaining = [...studentCoords];
  let current = driverLocation;

  while (remaining.length > 0) {
    remaining.sort(
      (a, b) => haversineDistance(current, a) - haversineDistance(current, b)
    );
    const next = remaining.shift();
    if (next) {
      route.push(next);
      current = next;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Driver Marker */}
        <Marker
          coordinate={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          }}
          title="You (Driver)"
          pinColor="blue"
        />

        {/* Student Markers */}
        {studentCoords.map((s, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: s.latitude,
              longitude: s.longitude,
            }}
            title={s.name}
            description="Student Home"
            pinColor="green"
          />
        ))}

        {/* Route Polyline */}
        <Polyline coordinates={route} strokeWidth={4} strokeColor="orange" />
      </MapView>
    </View>
  );
};

export default HomeDriver;
