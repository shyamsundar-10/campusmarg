import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "@/screens/SettingsScreen";
import HelpScreen from "@/screens/HelpScreen";
import MapScreen from "@/screens/MapScreen";
import AboutScreen from "@/screens/AboutScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import AttendanceScreen from "@/screens/AttendanceScreen";
import HomeScreen from "@/screens/HomeScreen";

const Drawer = createDrawerNavigator();

// App Logo for Header
const AppLogo = () => (
  <View style={styles.headerLogoContainer}>
    <Image source={require("../assets/images/icon.png")} style={styles.logo} />
    <Text style={styles.headerTitle}>Campus Marg</Text>
  </View>
);

// Custom Drawer Content (with AppLogo at the top)
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.headerTitle}>Campus Marg</Text>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const App = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerStyle: {
        width: 300, // drawer's width
      },
      drawerActiveTintColor: "#25aee0", // Highlight color for active menu item
      drawerInactiveTintColor: "#555", // Color for inactive menu items
      headerTitle: () => <AppLogo />,
      headerTitleAlign: "center",
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Live Tracking"
      component={MapScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="map-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Attendance"
      component={AttendanceScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Help & Support"
      component={HelpScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="help-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="About Us"
      component={AboutScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons
            name="information-circle-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Drawer.Navigator>
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
  logoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
