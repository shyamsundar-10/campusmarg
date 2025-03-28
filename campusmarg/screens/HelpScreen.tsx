import React, { useState } from "react";
import { Layout, Text, Card, Avatar } from "@ui-kitten/components";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";

const HelpScreen = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const mailtoLink = `mailto:support@campusmarg.com?subject=Support Request&body=${encodeURIComponent(
      message
    )}`;
    try {
      const supported = await Linking.canOpenURL(mailtoLink);
      if (supported) {
        await Linking.openURL(mailtoLink);
      } else {
        Alert.alert(
          "Error",
          "No email app found. Please configure your email application."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred while trying to send the email."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text category="h3" style={styles.header}>Contact Support</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={15}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text category="h6" style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    padding: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 0,
    padding: 10,
    fontSize: 16,
    height: 200,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 0,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HelpScreen;
