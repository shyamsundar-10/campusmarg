import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = "http://10.46.215.194:8000"; // replace with your IP

type AttendanceRecord = {
  sic: string;
  name: string;
  phone: string;
  status: string;
  timestamp: string;
};

const ConductorScreen = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/attendance/present/?date=${today}`
      );
      setRecords(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAttendance();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: AttendanceRecord }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {item.name}
        </Text>
        <Text style={styles.name}>
          {item.sic}
        </Text>
      </View>
      <Ionicons
        name={"checkmark-circle"}
        size={28}
        color={"green"}
        style={styles.icon}
      />
    </View>
  );

  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>📋 Attendance for {today}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.sic}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No attendance marked yet.</Text>
          }
        />
      )}
    </Layout>
  );
};

export default ConductorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#fff9eb",
    justifyContent:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    width: "100%",
    height: 100,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#f3eee0",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  phone: {
    fontSize: 14,
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
