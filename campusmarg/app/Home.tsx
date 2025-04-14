import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
  Dimensions,
  ScrollView,
} from "react-native";
import { Layout, Input } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import routesJson from "../assets/Routes.json";

type Stop = {
  Name: string;
  Coordinates: {
    lat: number;
    lng: number;
  };
};

type DriverInfo = string | { Name: string; Phone: string };

type Route = {
  BusNo: string;
  RouteNo: string;
  Stops: Stop[];
  Driver: DriverInfo;
};

type RoutesData = {
  [key: string]: Route;
};

type SearchResult = {
  stopName: string;
  route: Route;
};

const routesData = routesJson as RoutesData;
const { height } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [usertype, setUsertype] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const loadUserType = async () => {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUsertype(user?.usertype?.toLowerCase());
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }
    };

    const loadRoutes = () => {
      try {
        const routesArray = Object.values(routesData);
        setAllRoutes(routesArray);
      } catch (error) {
        console.error("Error processing routes data:", error);
        Alert.alert("Error", "Could not load route information.");
      }
    };

    loadUserType();
    loadRoutes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    allRoutes.forEach((route) => {
      if (route.BusNo.toLowerCase().includes(lowerQuery)) {
        route.Stops.forEach((stop) => {
          results.push({ stopName: stop.Name, route });
        });
      } else {
        route.Stops.forEach((stop) => {
          if (stop.Name.toLowerCase().includes(lowerQuery)) {
            results.push({ stopName: stop.Name, route });
          }
        });
      }
    });

    setFilteredResults(results);
  };

  const handleResultPress = (result: SearchResult) => {
    Keyboard.dismiss();
    setSearchQuery("");
    setFilteredResults([]);
    Alert.alert(
      "Route Selected",
      `You selected Stop: ${result.stopName}\nRoute: ${result.route.RouteNo}\nBus: ${result.route.BusNo}`
    );
  };

  const handleSOS = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push("/EmergencySOS");
  };

  const handleNotifyStudent = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Notification sent",
      "Students at the next stop have been notified."
    );
  };

  const handleSubmitAttendance = () => {
    Alert.alert(
      "Confirm Attendance",
      "Are you sure you want to submit your attendance?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert(
              "Attendance Submitted",
              "Your attendance has been recorded."
            );
          },
        },
      ]
    );
  };

  return (
    <Layout style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        showsVerticalScrollIndicator={false}
      >
        <Input
          placeholder="Search Routes by Bus No or Stop..."
          accessoryLeft={() => (
            <Ionicons name="search" size={24} color="grey" />
          )}
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={handleSearch}
          accessoryRight={
            searchQuery.length > 0
              ? () => (
                  <TouchableOpacity onPress={() => handleSearch("")}>
                    <Ionicons name="close-circle" size={24} color="grey" />
                  </TouchableOpacity>
                )
              : undefined
          }
        />

        {/* Search Result List */}
        {searchQuery.trim().length > 0 && (
          <View style={styles.overlayResultsContainer}>
            {filteredResults.length === 0 ? (
              <Text style={styles.noResultsText}>No routes found.</Text>
            ) : (
              filteredResults.map((result, index) => (
                <TouchableOpacity
                  key={`${result.route.BusNo}-${index}`}
                  onPress={() => handleResultPress(result)}
                  style={styles.resultItem}
                >
                  <Ionicons
                    name="bus-outline"
                    size={20}
                    color="#555"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.resultText}>
                    {result.stopName} | Route {result.route.RouteNo} | Bus {result.route.BusNo}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        <View style={styles.mapContainer}>
          <Map />
        </View>

        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.buttonBox} onPress={handleSOS}>
            <View style={styles.iconContainer}>
              <Ionicons name="help-buoy" size={40} color="red" />
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.textContainer}>
              <Text style={styles.ButtonText}>Emergency SOS</Text>
            </View>
          </TouchableOpacity>

          {usertype === "driver" ? (
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={handleNotifyStudent}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={40} color="black" />
              </View>
              <View style={styles.separatorVertical} />
              <View style={styles.textContainer}>
                <Text style={styles.ButtonText}>Notify Student</Text>
              </View>
            </TouchableOpacity>
          ) : usertype === "student" ? (
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={handleSubmitAttendance}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="calendar-outline" size={40} color="black" />
              </View>
              <View style={styles.separatorVertical} />
              <View style={styles.textContainer}>
                <Text style={styles.ButtonText}>Submit Attendance</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff9eb",
  },
  innerContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  searchBox: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f3eee0",
    marginBottom: 10,
  },
  overlayResultsContainer: {
    width: "90%",
    maxHeight: height * 0.3,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
    marginBottom: 15,
    zIndex: 999,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  resultText: {
    fontSize: 15,
    color: "#333",
    flexShrink: 1,
  },
  noResultsText: {
    padding: 15,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
  mapContainer: {
    width: "90%",
    height: 350,
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f3eee0",
    borderWidth: 2,
    marginBottom: 20,
  },
  boxContainer: {
    width: "90%",
    gap: 15,
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 90,
    borderRadius: 20,
    backgroundColor: "#fff9eb",
    borderWidth: 1,
    borderColor: "#f0eada",
    elevation: 4,
    overflow: "hidden",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separatorVertical: {
    width: 1,
    height: "60%",
    backgroundColor: "#e0d8c8",
  },
  textContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});

export default Home;
