import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Layout, Input } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  const handleSOS = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push("/EmergencySOS");
  };

  return (
    <ScrollView style={{ backgroundColor: "#fffef4" }}>
      <Layout style={styles.container}>
        {/* Search Bar */}
        <Input
          placeholder="Search Routes..."
          accessoryLeft={() => (
            <Ionicons name="search" size={30} color="black" />
          )}
          style={styles.searchBox}
        />

        <View style={styles.mapContainer}>
          <Map />
        </View>

        {/* Vertical Buttons */}
        <View style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.buttonBox}
            activeOpacity={0.8}
            onPress={handleSOS}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="help-buoy" size={40} color="red" />
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.textContainer}>
              <Text style={styles.ButtonText}>Emergency SOS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBox} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={40} color="black" />
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.textContainer}>
              <Text style={styles.ButtonText}>Submit Attendance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff9eb",
  },
  searchBox: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f3eee0"
  },
  mapContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    height: 350,
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f3eee0",
    borderWidth: 2,
  },
  boxContainer: {
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  buttonBox: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff9eb",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    overflow: "hidden",
  },

  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  separatorVertical: {
    width: 2,
    height: "60%",
    backgroundColor: "#f3eee0",
  },

  textContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  ButtonText: {
    fontSize: 20,
    color: "#000",
    fontWeight:"600"
  },
});

export default Home;
