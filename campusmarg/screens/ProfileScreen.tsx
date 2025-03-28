import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
  const [avatar, setAvatar] = useState<{ uri: string }>({
    uri: "https://th.bing.com/th/id/OIP.DfbvP4LXGsNlhGino3DA6QHaHa?rs=1&pid=ImgDetMain",
  });
  const [name, setName] = useState<string>("Demo Name");
  const [sic, setSic] = useState<string>("21bcse00");
  const [address, setAddress] = useState<string>(
    "Silicon University, Patia, 751024"
  );
  const [phone, setPhone] = useState<string>("7780951420");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>SIC</Text>
          <TextInput style={styles.input} value={sic} onChangeText={setSic} />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Phone No</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#c0d9e2",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#2575fc",
    padding: 5,
    borderRadius: 15,
  },
  infoContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginTop: 5,
  },
  saveBtn: {
    backgroundColor: "#2575fc",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
