import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { getORSRoute } from "../utils/getORSRoute";
import { getDistance } from "geolib";
import routesJson from "../assets/Routes.json";

type Stop = {
  Name: string;
  Coordinates: {
    lat: number;
    lng: number;
  };
};

type Route = {
  BusNo: string;
  Stops: Stop[];
  Driver: string | { Name: string; Phone: string }; // Use your actual format
};

type RoutesData = {
  [key: string]: Route;
};

const routesData = routesJson as RoutesData;

const screenWidth = Dimensions.get("window").width;

const HomeStudent = () => {
  const mapRef = useRef<MapView>(null);
  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [studentStop, setStudentStop] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [eta, setEta] = useState<string>("Calculating...");

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        const user = JSON.parse(storedUser || "{}");

        const routeKey = user?.route;
        const addressName = user?.address;

        if (!routeKey || !addressName) {
          Alert.alert("Missing data", "Student route or address is missing.");
          return;
        }

        const stops = routesData[routeKey]?.Stops;
        const stop = stops.find((s: any) => s.Name === addressName);

        if (!stop) {
          Alert.alert(
            "Stop not found",
            `No stop found for address: ${addressName}`
          );
          return;
        }

        const studentStopCoord = {
          latitude: stop.Coordinates.lat,
          longitude: stop.Coordinates.lng,
        };

        setStudentStop(studentStopCoord);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location access is required.");
          return;
        }

        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          async (loc) => {
            const current = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setDriverLocation(current);

            // Fetch new route from driver to student's stop
            const path = await getORSRoute([current, studentStopCoord]);
            setRouteCoords(path);

            // ETA calculation
            const distance = getDistance(current, studentStopCoord); // meters
            const speedKmh = 20;
            const etaMin = (distance / 1000 / speedKmh) * 60;
            setEta(`${Math.round(etaMin)} min to pickup`);
          }
        );
      } catch (err) {
        console.error("Error in HomeStudent.tsx:", err);
        Alert.alert("Error", "Failed to load student route.");
      }
    };

    initialize();
  }, []);

  if (!driverLocation || !studentStop || routeCoords.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading route...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker coordinate={driverLocation}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 28 }}>🚌</Text>
          </View>
        </Marker>

        <Marker coordinate={studentStop} title="My Stop" pinColor="red" />

        <Polyline
          coordinates={routeCoords}
          strokeColor="orange"
          strokeWidth={5}
        />
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
});

export default HomeStudent;
