import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MapView, { Polyline, LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import routesData from "../assets/Routes.json";
import { getORSRoute } from "../utils/getORSRoute";

// Define route colors
const routeColors = ["#FF5733", "#33A1FF", "#28A745", "#FFC300", "#9B59B6"];
// Define route name mapping if needed
const routeNames: Record<string, string> = {
  Route1: "Route 1",
  Route2: "Route 2",
  Route3: "Route 3",
  Route4: "Route 4",
  Route5: "Route 5",
};

const Map = () => {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 20.29, // Default coordinates
    longitude: 85.82,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [routesCoords, setRoutesCoords] = useState<Record<string, LatLng[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location access is required to show the map correctly.");
        return;
      }

      setLocationPermission(true);

      // Get user's current location
      try {
        const location = await Location.getCurrentPositionAsync({});
        const currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(currentLocation);
        
        setRegion({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }

      // Load all routes
      const routes: Record<string, LatLng[]> = {};
      
      // Use Object.entries for type safety
      for (const [key, route] of Object.entries(routesData)) {
        try {
          const stops: LatLng[] = route.Stops.map((stop) => ({
            latitude: stop.Coordinates.lat,
            longitude: stop.Coordinates.lng,
          }));
          
          // Get route coordinates from ORS service
          const fullRoute = await getORSRoute(stops);
          routes[key] = fullRoute;
        } catch (error) {
          console.error(`Error loading route ${key}:`, error);
        }
      }
      
      setRoutesCoords(routes);
      setIsLoading(false);
    };

    initializeMap();
  }, []);

  // Function to center map on user's current location
  const centerOnUser = async () => {
    if (!userLocation) {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const newLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(newLocation);
        
        const newRegion: Region = {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        
        mapRef.current?.animateToRegion(newRegion, 1000);
      } catch (error) {
        alert("Unable to fetch your location.");
      }
    } else {
      const newRegion: Region = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#25aee0" />
        <Text style={styles.loaderText}>Loading routes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {locationPermission && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {/* Render all routes with different colors */}
            {Object.entries(routesCoords).map(([routeKey, coords], index) => {
              const routeData = routesData[routeKey as keyof typeof routesData];
              
              return (
                <React.Fragment key={routeKey}>
                  <Polyline
                    coordinates={coords}
                    strokeColor={routeColors[index % routeColors.length]}
                    strokeWidth={4}
                  />
                </React.Fragment>
              );
            })}
          </MapView>

          {/* Route legend */}
          <View style={styles.legend}>
            {Object.keys(routesCoords).map((routeKey, index) => (
              <View key={`legend-${routeKey}`} style={styles.legendItem}>
                <View 
                  style={[
                    styles.colorBox, 
                    { backgroundColor: routeColors[index % routeColors.length] }
                  ]} 
                />
                <Text style={styles.legendText}>
                  {routeNames[routeKey] || routeKey} - {routesData[routeKey as keyof typeof routesData].BusNo}
                </Text>
              </View>
            ))}
          </View>

          {/* Location button */}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
  },
  legend: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
  },
});

export default Map;
