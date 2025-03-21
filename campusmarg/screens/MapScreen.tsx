import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 20.29,
          longitude: 85.82,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
  
  export default MapScreen;