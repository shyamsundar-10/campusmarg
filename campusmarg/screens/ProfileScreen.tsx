import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text, Layout, Card } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Address {
  area: string;
  latitude?: number;
  longitude?: number;
}

interface User {
  name: string;
  photo: string;
  sic: string;
  usertype: string;
  phone?: string;
  bloodGroup?: string;
  address?: Address;
}

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <Layout style={styles.centered}>
        <ActivityIndicator size="large" color="#25aee0" />
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout style={styles.centered}>
        <Text category="h5">No user data found.</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Image source={{ uri: user.photo }} style={styles.avatar} />
        <Text category="h5" style={styles.name}>
          {user.name}
        </Text>
        <Text appearance="hint" style={styles.infoText}>SIC: {user.sic}</Text>
        <Text appearance="hint" style={styles.infoText}>User Type: {user.usertype}</Text>

        {user.phone && (
          <Text appearance="hint" style={styles.infoText}>Phone: {user.phone}</Text>
        )}
        {user.bloodGroup && (
          <Text appearance="hint" style={styles.infoText}>Blood Group: {user.bloodGroup}</Text>
        )}

        {user.usertype === "student" && user.address && (
          <>
            <Text style={styles.sectionTitle}>Address Info</Text>
            <Text appearance="hint" style={styles.infoText}>Area: {user.address.area}</Text>
            <Text appearance="hint" style={styles.infoText}>Latitude: {user.address.latitude}</Text>
            <Text appearance="hint" style={styles.infoText}>Longitude: {user.address.longitude}</Text>
          </>
        )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    alignItems: "center",
    padding: 25,
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    marginTop: 4,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#3366FF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
