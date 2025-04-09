import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "../assets/Users.json";

type Props = {
  onDone: () => void;
};

const WelcomeScreen = ({ onDone }: Props) => {
  const [userType, setUserType] = useState<"student" | "driver" | null>(null);
  const [sic, setSic] = useState("");

  const handleVerification = async () => {
    if (!userType) {
      Alert.alert("Error", "Please select a user type.");
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.usertype.toLowerCase() === userType.toLowerCase() &&
        user.sic.trim().toLowerCase() === sic.trim().toLowerCase()
    );

    if (matchedUser) {
      await AsyncStorage.setItem("hasSeenWelcome", "true");
      await AsyncStorage.setItem("currentUser", JSON.stringify(matchedUser));
      onDone();
    } else {
      Alert.alert("Invalid SIC", "No matching user found.");
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h4" style={{ marginBottom: 20 }}>
        Welcome
      </Text>
      {!userType ? (
        <>
          <Button onPress={() => setUserType("student")} style={styles.button}>
            I am a Student
          </Button>
          <Button onPress={() => setUserType("driver")} style={styles.button}>
            I am a Driver
          </Button>
        </>
      ) : (
        <>
          <Text>Enter your SIC Number:</Text>
          <TextInput
            placeholder="e.g., 21BCSB14"
            value={sic}
            onChangeText={setSic}
            style={styles.input}
          />
          <Button onPress={handleVerification} style={styles.button}>
            Verify
          </Button>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    width: "100%",
  },
});

export default WelcomeScreen;
