import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { getORSRoute } from "../utils/getORSRoute";

type LatLng = {
  latitude: number;
  longitude: number;
};

const HomeStudent = () => {
  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [studentHome, setStudentHome] = useState<LatLng | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const userData = await AsyncStorage.getItem("currentUser");
      const user = JSON.parse(userData || "{}");

      const lat = parseFloat(user?.address?.latitude);
      const lon = parseFloat(user?.address?.longitude);

      if (!isNaN(lat) && !isNaN(lon)) {
        const home = { latitude: lat, longitude: lon };
        setStudentHome(home);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location access is required.");
          return;
        }

        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          async (location) => {
            const driverLoc = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setDriverLocation(driverLoc);

            const route = await getORSRoute([driverLoc, home]);
            setRouteCoords(route);
            setLoading(false);
          }
        );
      } else {
        Alert.alert("Invalid location", "Student home coordinates not found.");
      }
    };

    init();
  }, []);

  if (!driverLocation || !studentHome || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={driverLocation} title="Driver" pinColor="blue" />
        <Marker coordinate={studentHome} title="Home" pinColor="green" />
        <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
      </MapView>
    </View>
  );
};

export default HomeStudent;
