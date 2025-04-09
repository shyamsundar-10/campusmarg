import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Layout, Text, Toggle, Divider, List, ListItem, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // TODO: Connect with ThemeContext or UI Kitten theme switch
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("hasSeenWelcome");
          await AsyncStorage.removeItem("userData");
          await Updates.reloadAsync();
        },
      },
    ]);
  };

  const aboutData = [
    {
      title: "Terms of Use & Privacy Policy",
      description: "Read our terms and privacy policies.",
      onPress: () => alert("Terms of Use and Privacy Policy"),
    },
    {
      title: "App Version",
      description: "Version 1.0.0",
      onPress: () => alert("Version 1.0.0"),
    },
  ];

  return (
    <Layout style={styles.container}>
      {/* Appearance Section */}
      <Text category="h6" style={styles.sectionTitle}>
        Appearance
      </Text>
      <View style={styles.itemRow}>
        <Text>Light Theme</Text>
        <Toggle disabled checked={darkMode} onChange={toggleDarkMode} />
      </View>
      <View style={styles.itemRow}>
        <Text>Notifications</Text>
        <Toggle disabled checked />
      </View>

      <Divider style={styles.divider} />

      {/* About Section */}
      <Text category="h6" style={styles.sectionTitle}>
        About
      </Text>
      <List
        data={aboutData}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            onPress={item.onPress}
          />
        )}
      />

      <Divider style={styles.divider} />

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <Button status="danger" onPress={handleLogout}>
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
  logoutContainer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default SettingsScreen;
