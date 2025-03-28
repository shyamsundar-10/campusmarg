import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Toggle, Divider, List, ListItem } from "@ui-kitten/components";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // theme switching logic 
  };

  const data = [
    {
      title: "Terms of Use and Privacy Policy",
      description: "View legal details",
      onPress: () => alert("Terms of Use and Privacy Policy"),
    },
    {
      title: "App Version",
      description: "Version 1.0.0",
      onPress: () => alert("1.0.0"),
    },
  ];

  return (
    <Layout style={styles.container}>
      {/* Appearance Section */}
      <Text category="h6" style={styles.sectionTitle}>
        Appearance
      </Text>
      <View style={styles.itemContainer}>
        <Text>Light Theme</Text>
        <Toggle disabled checked={darkMode} onChange={toggleDarkMode} />
      </View>
      <View style={styles.itemContainer}>
        <Text>Notifications</Text>
        <Toggle disabled checked />
      </View>
      <Divider style={styles.divider} />

      {/* About Section */}
      <Text category="h6" style={styles.sectionTitle}>
        About
      </Text>
      <List
        data={data}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            onPress={item.onPress}
          />
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 15,
  },
});

export default SettingsScreen;
