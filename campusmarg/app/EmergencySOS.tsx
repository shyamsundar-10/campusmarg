import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import { useNavigation } from "expo-router";

const EmergencySOS = () => {
  const navigation = useNavigation();

  const handlePress = (phoneNumber: string) => {
    const url = `tel://${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open dialer:", err)
    );
  };

  const emergencyContacts = [
    {
      label: "College Ambulance",
      icon: "medkit",
      number: "8917256130",
      color: "#FFD700",
    },
    {
      label: "Ambulance",
      icon: "skull-outline",
      number: "7205548508",
      color: "#FF6347",
    },
    {
      label: "Police Station",
      icon: "shield",
      number: "100",
      color: "#00BFFF",
    },
    { label: "Fire Station", icon: "flame", number: "101", color: "#32CD32" },
    {
      label: "Call Parents",
      icon: "call",
      number: "8917256130",
      color: "#FF69B4",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Emergency SOS</Text>

      {emergencyContacts.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.buttonBox, { backgroundColor: item.color }]}
          onPress={() => handlePress(item.number)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={40} color="#000" />
          </View>
          <View style={styles.separator} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default EmergencySOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff9eb",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 56,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  buttonBox: {
    width: "100%",
    height: 100,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 5,
    overflow: "hidden",
  },
  separator: {
    width: 2,
    height: "60%",
    backgroundColor: "#000",
    marginHorizontal: 10,
    opacity: 0.4
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8
  },
  textContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
