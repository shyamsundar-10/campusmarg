import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function Layout() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWelcome = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenWelcome");
        setHasSeenWelcome(value === "true");
      } catch (e) {
        console.error("Failed to load welcome state", e);
        setHasSeenWelcome(false);
      } finally {
        setLoading(false);
      }
    };

    checkWelcome();
  }, []);

  const handleDone = () => {
    AsyncStorage.setItem("hasSeenWelcome", "true");
    setHasSeenWelcome(true);
  };

  if (loading || hasSeenWelcome === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#25aee0" />
      </View>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {hasSeenWelcome ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      ) : (
        <WelcomeScreen onDone={handleDone} />
      )}
    </ApplicationProvider>
  );
}
