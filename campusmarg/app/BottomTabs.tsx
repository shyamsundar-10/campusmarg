import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile from "@/app/Profile";
import Settings from "@/app/Settings";
import Map from "@/app/Map";
import Home from "./Home";
import HomeStudent from "./HomeStudent";
import HomeDriver from "./HomeDriver";
import Live from "./Live";
const Tab = createBottomTabNavigator();

const AppLogo = () => (
  <View style={styles.headerLogoContainer}>
    <Image source={require("../assets/images/icon.png")} style={styles.logo} />
    <Text style={styles.headerTitle}>Campus Marg</Text>
  </View>
);

const getTabIconName = (routeName: string, focused: boolean) => {
  const icons: Record<string, [string, string]> = {
    Home: ["home-outline", "home"],
    Live: ["map-outline", "map"],
    Profile: ["person-outline", "person"],
    Settings: ["settings-outline", "settings"],
  };
  const [outline, filled] = icons[routeName] || ["ellipse-outline", "ellipse"];
  return focused ? filled : outline;
};

const CustomTabIcon = ({
  routeName,
  focused,
}: {
  routeName: string;
  focused: boolean;
}) => {
  const iconName = getTabIconName(routeName, focused);
  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.pillBackground} />}
      <Ionicons
        name={iconName as keyof typeof Ionicons.glyphMap}
        size={20}
        color={focused ? "#1a237e" : "#888"}
      />
    </View>
  );
};

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={{ flex: 1, alignItems: "center" }}>{children}</View>
  </TouchableWithoutFeedback>
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerTitle: () => <AppLogo />,
      headerTitleAlign: "center",
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
        marginTop: 4,
      },
      tabBarStyle: {
        backgroundColor: "#f7f8fd",
        height: 100,
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
        paddingTop: 15,
        borderTopWidth: 0,
        elevation: 10,
      },
      tabBarIcon: ({ focused }) => (
        <CustomTabIcon routeName={route.name} focused={focused} />
      ),
      tabBarButton: (props) => <CustomTabBarButton {...props} />,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen
      name="Live"
      component={Live}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
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
  iconContainer: {
    width: 60,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  pillBackground: {
    position: "absolute",
    width: 60,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#d9e4f5",
  },
});

export default BottomTabs;
