import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import users from "../assets/Users.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "driver" | null>(null);
  const [sic, setSic] = useState("");

  const handleLogin = async () => {
    const user = users.find(
      (u) => u.usertype === userType && u.sic.toLowerCase() === sic.toLowerCase()
    );

    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("hasLoggedIn", "true");
      router.replace("./BottomTabs"); // Navigate to main app
    } else {
      Alert.alert("Invalid SIC", "No matching user found.");
    }
  };

  if (!userType) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Campus Marg</Text>
        <TouchableOpacity style={styles.btn} onPress={() => setUserType("student")}>
          <Text style={styles.btnText}>I’m a Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setUserType("driver")}>
          <Text style={styles.btnText}>I’m a Driver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your SIC Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 21BACD4"
        value={sic}
        onChangeText={setSic}
        autoCapitalize="characters"
      />
      <Button title="Verify" onPress={handleLogin} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#25aee0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
