import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Users from "../assets/Users.json";
import { getORSRoute } from "../utils/getORSRoute";

type Coord = {
  latitude: number;
  longitude: number;
  name: string;
};

const HomeDriver = () => {
  const [driverLocation, setDriverLocation] = useState<Coord | null>(null);
  const [studentCoords, setStudentCoords] = useState<Coord[]>([]);
  const [routeCoords, setRouteCoords] = useState<Coord[]>([]);
  const [eta, setEta] = useState<number | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    const init = async () => {
      const students = Users.filter((u: any) => u.usertype === "student");

      const coords: Coord[] = students
        .map((s: any) => {
          const lat = parseFloat(s?.address?.latitude);
          const lon = parseFloat(s?.address?.longitude);
          if (!isNaN(lat) && !isNaN(lon)) {
            return {
              latitude: lat,
              longitude: lon,
              name: s.name,
            };
          }
          return null;
        })
        .filter(Boolean) as Coord[];

      setStudentCoords(coords);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const initialDriver = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        name: "You (Driver)",
      };
      setDriverLocation(initialDriver);

      const fullRoute = [initialDriver, ...coords];
      const orsRoute = await getORSRoute(fullRoute);
      const namedRoute: Coord[] = orsRoute.map((p) => ({ ...p, name: "" }));
      setRouteCoords(namedRoute);

      // Start location tracking
      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 10,
        },
        (locUpdate) => {
          const updatedLocation = {
            latitude: locUpdate.coords.latitude,
            longitude: locUpdate.coords.longitude,
            name: "You (Driver)",
          };
          setDriverLocation(updatedLocation);
          updateProgressAndETA(updatedLocation, namedRoute);
        }
      );
    };

    init();

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
      }
    };
  }, []);

  const updateProgressAndETA = async (current: Coord, route: Coord[]) => {
    const closestIndex = findClosestPointIndex(current, route);
    const remaining = route.slice(closestIndex);
    const distance = await calculateRouteDistance(remaining);
    const speed = 30; // km/h
    setEta(Math.round((distance / speed) * 60)); // in minutes
  };

  const findClosestPointIndex = (current: Coord, route: Coord[]) => {
    let minDist = Infinity;
    let index = 0;
    route.forEach((point, i) => {
      const d = haversineDistance(current, point);
      if (d < minDist) {
        minDist = d;
        index = i;
      }
    });
    return index;
  };

  const calculateRouteDistance = async (coords: Coord[]) => {
    let total = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      total += haversineDistance(coords[i], coords[i + 1]);
    }
    return total;
  };

  const haversineDistance = (a: Coord, b: Coord): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const aCalc =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  };

  if (!driverLocation || routeCoords.length === 0) return null;

  const progressIndex = findClosestPointIndex(driverLocation, routeCoords);
  const pastRoute = routeCoords.slice(0, progressIndex + 1);
  const futureRoute = routeCoords.slice(progressIndex + 1);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Students */}
        {studentCoords.map((s, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
            title={s.name}
            description="Student Home"
            pinColor="green"
          />
        ))}

        {/* Past Route */}
        <Polyline coordinates={pastRoute} strokeWidth={4} strokeColor="orange" />
        <Polyline coordinates={futureRoute} strokeWidth={4} strokeColor="gray" />

        {/* Bus Marker */}
        <Marker coordinate={driverLocation}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
      </MapView>

      {/* ETA */}
      {eta !== null && (
        <View
          style={{
            position: "absolute",
            top: 50,
            alignSelf: "center",
            backgroundColor: "#fff9eb",
            padding: 10,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#4b472b" }}>
            Estimated Time: {eta} min
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeDriver;
