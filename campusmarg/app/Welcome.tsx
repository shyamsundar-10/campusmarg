// campusmarg/app/Welcome.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "../assets/Users.json";

type Props = {
  onDone: () => void;
};

const Welcome = ({ onDone }: Props) => {
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
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Campus Marg</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={{ fontSize: 38, fontWeight: "bold", textAlign: "center" }}>
          Welcome!
        </Text>

        {userType && (
          <>
            <TouchableOpacity
              onPress={() => {
                setUserType(null);
                setSic("");
              }}
              style={styles.backButton}
            >
              <Text style={styles.backText}>{"<"} Back</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Enter your SIC Number</Text>
            <TextInput
              placeholder="e.g., 21BCSB14"
              value={sic}
              onChangeText={setSic}
              style={styles.input}
              placeholderTextColor="#a29e8d"
            />
            <Button onPress={handleVerification} style={styles.Sbutton}>
              Verify
            </Button>
          </>
        )}
      </View>

      {!userType && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => setUserType("student")}
            style={styles.Sbutton}
          >
            <Text style={{ fontWeight: "bold", color: "#fff9eb" }}>
              I am a Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("driver")}
            style={styles.Dbutton}
          >
            <Text style={{ fontWeight: "bold" }}>I am a Driver</Text>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "rgba(255, 249, 235, 0.95)",
  },
  topSection: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
  },
  bottomSection: {
    marginBottom: 30,
  },
  logo: {
    borderRadius: 20,
    width: 40,
    height: 40,
    margin: 10,
    elevation: 5,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#4b472b",
    textAlign: "center",
  },
  label: {
    color: "#4b472b",
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dec97e",
    backgroundColor: "#fff",
    padding: 12,
    width: "100%",
    borderRadius: 10,
    marginBottom: 16,
    color: "#4b472b",
  },
  Sbutton: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    borderWidth: 0,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 5,
  },
  Dbutton: {
    width: "100%",
    height: 60,
    backgroundColor: "#f3eee0",
    borderWidth: 0,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 5,
  },
  backButton: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  backText: {
    color: "#4b472b",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Welcome;
