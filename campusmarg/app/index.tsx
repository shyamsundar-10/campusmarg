import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "@/screens/SettingsScreen";
import HelpScreen from "@/screens/HelpScreen";
import MapScreen from "@/screens/MapScreen";
import AboutScreen from "@/screens/AboutScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const App = () => (
  <Drawer.Navigator
    screenOptions={{
      headerTitle: () => <AppLogo />,
      drawerStyle: {
        width: 300,
      },
    }}
  >
    <Drawer.Screen name="Live Tracking" component={MapScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Help & Support" component={HelpScreen} />
    <Drawer.Screen name="About us" component={AboutScreen} />
  </Drawer.Navigator>
);

const AppLogo = () => (
  <View style={styles.logoContainer}>
    <Image source={require("../assets/images/icon.png")} style={styles.logo} />
    <Text style={styles.title}>Campus Marg</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
