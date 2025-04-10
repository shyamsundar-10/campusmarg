import React, { useState } from "react";
import { Text } from "@ui-kitten/components";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const Help = () => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text category="h4" style={styles.header}>
          Contact Support
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          placeholderTextColor="#a29e8c"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={15}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text category="h6" style={styles.buttonText}>
            Send
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff9eb",
  },
  header: {
    textAlign: "center",
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
    color: "#4b472b",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ebe3bd",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    height: 250,
    backgroundColor: "#f3eee0",
    color: "#4b472b",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ebe3bd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#4b472b",
    fontWeight: "bold",
  },
});

export default Help;
