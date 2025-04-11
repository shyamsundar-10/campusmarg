import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Map = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 20.29,
    longitude: 85.82,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationPermission, setLocationPermission] = useState(false);
  // const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to show the map correctly."
        );
        return;
      }
      setLocationPermission(true);

      let userLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const centerOnUser = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {locationPermission && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton={false}
          />
          <TouchableOpacity style={styles.fab} onPress={centerOnUser}>
            <Ionicons name="locate" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#25aee0",
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
});

export default Map;
