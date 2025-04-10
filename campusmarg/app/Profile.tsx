import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text, Layout } from "@ui-kitten/components";
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

const Profile = () => {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <Image source={{ uri: user.photo }} style={styles.avatar} />
          <Text category="h5" style={styles.name}>
            {user.name}
          </Text>
          <Text style={styles.subtext}>{user.usertype.toUpperCase()}</Text>

          <View style={styles.infoGroup}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>SIC</Text>
              <Text style={styles.value}>{user.sic}</Text>
            </View>

            {user.phone && (
              <View style={styles.infoItem}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{user.phone}</Text>
              </View>
            )}

            {user.bloodGroup && (
              <View style={styles.infoItem}>
                <Text style={styles.label}>Blood Group</Text>
                <Text style={styles.value}>{user.bloodGroup}</Text>
              </View>
            )}
          </View>
        </View>

        {user.usertype === "student" && user.address && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address Info</Text>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Area</Text>
              <Text style={styles.value}>{user.address.area}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Latitude</Text>
              <Text style={styles.value}>
                {user.address.latitude?.toString() ?? "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Longitude</Text>
              <Text style={styles.value}>
                {user.address.longitude?.toString() ?? "N/A"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
  },
  subtext: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textTransform: "capitalize",
  },
  infoGroup: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  section: {
    padding: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
});

export default Profile;
