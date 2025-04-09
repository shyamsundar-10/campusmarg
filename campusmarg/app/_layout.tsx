import React from 'react';
import { Stack } from 'expo-router';
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

const Layout = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="screens/WelcomeScreen" />
      <Stack.Screen name="screens/BottomTabs" /> */}
    </Stack>
  </ApplicationProvider>
);

export default Layout;
