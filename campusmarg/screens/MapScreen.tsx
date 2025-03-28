import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 20.29,
    longitude: 85.82,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required to show the map correctly.");
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

  return (
    <View style={styles.container}>
      {locationPermission ? (
        <MapView
          style={styles.map}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
        />
      ) : null}
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
});

export default MapScreen;
