import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { getORSRoute } from "../utils/getORSRoute";
import routesData from "../assets/Routes.json";
import { getDistance } from "geolib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const HomeDriver = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [completedCoords, setCompletedCoords] = useState<LatLng[]>([]);
  const [eta, setEta] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextStop, setNextStop] = useState<LatLng | null>(null);
  const [stops, setStops] = useState<LatLng[]>([]);

  useEffect(() => {
    (async () => {
      // Get current user from AsyncStorage
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const userRouteKey = (user?.route ?? "Route1") as keyof typeof routesData;
      const route = routesData[userRouteKey];

      if (!route || !route.Stops) {
        console.error(`Route ${userRouteKey} not found in Routes.json`);
        return;
      }

      const stopCoords = route.Stops.map((stop: any) => ({
        latitude: stop.Coordinates.lat,
        longitude: stop.Coordinates.lng,
      }));
      setStops(stopCoords);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const current = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(current);

      const fullPath = [current, ...stopCoords];
      const orsPath = await getORSRoute(fullPath);
      setRouteCoords(orsPath);
      setNextStop(stopCoords[0]);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const locationSub = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 3000,
        distanceInterval: 10,
      },
      (loc) => {
        const current = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setLocation(current);
        updateProgress(current);
        updateETA(current);
      }
    );
    return () => {
      locationSub.then((sub) => sub.remove());
    };
  }, [routeCoords, stops]);

  const updateProgress = (current: LatLng) => {
    if (routeCoords.length === 0) return;

    const index = routeCoords.findIndex(
      (coord) => getDistance(coord, current) < 30
    );
    if (index !== -1) {
      const completed = routeCoords.slice(0, index);
      setCompletedCoords(completed);

      const next = stops.find((stop) => getDistance(current, stop) > 30);
      if (next) setNextStop(next);
    }
  };

  const updateETA = (current: LatLng) => {
    if (!nextStop) return;
    const distanceToNextStop = getDistance(current, nextStop);
    const speedKmh = 20;
    const etaMinutes = (distanceToNextStop / 1000 / speedKmh) * 60;
    setEta(`${Math.round(etaMinutes)} min to next stop`);
  };

  if (isLoading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading map and route...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {stops.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            title={`Stop ${index + 1}`}
            pinColor="orange"
          />
        ))}

        <Polyline
          coordinates={completedCoords}
          strokeColor="green"
          strokeWidth={6}
        />
        <Polyline
          coordinates={routeCoords.slice(completedCoords.length)}
          strokeColor="red"
          strokeWidth={4}
        />

        <Marker coordinate={location}>
          <View style={styles.busMarker}>
            <Text style={{ fontSize: 24 }}>🚌</Text>
          </View>
        </Marker>
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{eta}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  busMarker: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 5,
  },
});

export default HomeDriver;
