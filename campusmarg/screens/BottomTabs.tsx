// navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";

import HomeScreen from "@/screens/HomeScreen";
import MapScreen from "@/screens/MapScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingsScreen from "@/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppLogo = () => (
  <View style={styles.headerLogoContainer}>
    <Image source={require("../assets/images/icon.png")} style={styles.logo} />
    <Text style={styles.headerTitle}>Campus Marg</Text>
  </View>
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerTitle: () => <AppLogo />,
      headerTitleAlign: "center",
      tabBarActiveTintColor: "#25aee0",
      tabBarInactiveTintColor: "#555",
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Home":
            iconName = "home-outline";
            break;
          case "Live":
            iconName = "map-outline";
            break;
          case "Profile":
            iconName = "person-outline";
            break;
          case "Settings":
            iconName = "settings-outline";
            break;
          default:
            iconName = "ellipse-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Live" component={MapScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  headerLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    borderRadius: 20,
    width: 40,
    height: 40,
    margin: 10,
    borderColor: "#c0d9e2",
    borderWidth: 2,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BottomTabs;
