import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Layout, Text, Toggle, Divider, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("hasSeenWelcome");
          await AsyncStorage.removeItem("currentUser");
          await Updates.reloadAsync();
        },
      },
    ]);
  };

  return (
    <Layout style={styles.container}>
      {/* Appearance Section */}
      <Text category="h6" style={styles.sectionTitle}>
        Appearance
      </Text>
      <View style={styles.itemRow}>
        <Text>Notifications</Text>
        <Toggle disabled checked />
      </View>

      <Divider style={styles.divider} />

      {/* About Section */}
      <Text category="h6" style={styles.sectionTitle}>
        Conductor
      </Text>
      <View style={styles.linkItem}>
        <Text onPress={() => router.push("/Conductor")} style={styles.linkText}>
          Attendance
        </Text>
      </View>

      {/* About Section */}
      <Text category="h6" style={styles.sectionTitle}>
        About
      </Text>
      <View style={styles.linkItem}>
        <Text onPress={() => router.push("/Help")} style={styles.linkText}>
          Help & Support
        </Text>
      </View>
      <View style={styles.linkItem}>
        <Text onPress={() => router.push("/About")} style={styles.linkText}>
          Development Team
        </Text>
      </View>
      <View style={styles.linkItem}>
        <Text
          style={styles.linkText}
          onPress={() => alert("Final Year Major Project")}
        >
          Terms & Privacy Policy
        </Text>
      </View>
      <View style={styles.linkItem}>
        <Text style={styles.linkText}>App Version: 1.0.0</Text>
      </View>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <Button
          style={{ backgroundColor: "red", borderWidth: 0 }}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff9eb",
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    marginVertical: 20,
  },
  linkItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  linkText: {
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default Settings;
