import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const AttendanceScreen = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Attendance Page</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AttendanceScreen;
