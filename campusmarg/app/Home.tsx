import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Layout, Input } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";

const Home = () => {
  return (
    <Layout style={styles.container}>
      {/* Search Bar */}
      <Input
        placeholder="Search Routes..."
        accessoryLeft={() => <Ionicons name="search" size={30} color="black" />}
        style={styles.searchBox}
      />

      {/* Live Bus Tracking (Yellow Box with Map) */}
      <View style={styles.mapContainer}>
        <Map />
      </View>

      {/* White Boxes */}
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.leftBox}>
          <Ionicons name="help-buoy" size={40} color="red" />
          <Text style={styles.leftButtonText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightBox}>
          <Ionicons name="calendar-outline" size={40} color="black" />
          <Text style={styles.rightButtonText}>Something</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(209, 229, 238)",
    paddingTop: 20,
  },
  searchBox: {
    width: "90%",
    borderRadius: 10,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
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
    borderColor: "#c0d9e2",
    borderWidth: 2,
  },
  leftBox: {
    width: "47.5%",
    height: 160,
    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    elevation: 5,
  },
  rightBox: {
    width: "47.5%",
    height: 160,
    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    elevation: 5,
  },
  leftButtonText: {
    fontSize: 20,
    color: "red",
  },
  rightButtonText: {
    fontSize: 20,
  },
  errorText: {
    textAlign: "center",
    padding: 20,
    color: "red",
  },
});

export default Home;
