import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

type LatLng = {
  latitude: number;
  longitude: number;
};

const HomeStudent = () => {
  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [studentHome, setStudentHome] = useState<LatLng | null>(null);

  useEffect(() => {
    const getLocationAndUser = async () => {
      try {
        // Get student info from AsyncStorage
        const userData = await AsyncStorage.getItem("currentUser");
        const user = JSON.parse(userData || "{}");

        const lat = parseFloat(user?.address?.latitude);
        const lon = parseFloat(user?.address?.longitude);

        if (!isNaN(lat) && !isNaN(lon)) {
          setStudentHome({ latitude: lat, longitude: lon });
        } else {
          Alert.alert("Invalid address", "Student home coordinates are missing.");
          return;
        }

        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location access is required.");
          return;
        }

        // Get driver's current location
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setDriverLocation({ latitude, longitude });
          }
        );
      } catch (error) {
        console.error("Error getting location or user:", error);
        Alert.alert("Error", "Something went wrong while loading location.");
      }
    };

    getLocationAndUser();
  }, []);

  if (!driverLocation || !studentHome) {
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
        <Polyline
          coordinates={[driverLocation, studentHome]}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
};

export default HomeStudent;
