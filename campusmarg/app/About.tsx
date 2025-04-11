import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout, Text, Card, Avatar } from "@ui-kitten/components";
import ShineOverlay from "../components/ShineOverlay";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const teamMembers = [
  {
    name: "Shyam",
    role: "Developer",
    image: require("../assets/images/shyam.png"),
  },
  {
    name: "Siddharth",
    role: "Developer",
    image: require("../assets/images/siddharth.png"),
  },
  {
    name: "Akankhya",
    role: "Developer",
    image: require("../assets/images/akku.png"),
  },
  {
    name: "Abhisek",
    role: "Developer",
    image: require("../assets/images/abhi.png"),
  },
];

const About = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Layout style={styles.innerLayout}>
        <Text category="h4" style={styles.sectionTitle}>
          Development Team
        </Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <Card key={index} style={styles.teamCard}>
              <Avatar source={member.image} style={styles.avatar} />
              <Text style={styles.nameText} category="h6">
                {member.name}
              </Text>
              <Text style={styles.roleText} category="s1">
                {member.role}
              </Text>
            </Card>
          ))}
          <ShineOverlay />
        </View>
        <Text style={styles.quote}>
          "Revolutionizing campus life with simplicity and efficiency."
        </Text>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9eb",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  innerLayout: {
    padding: 20,
    backgroundColor: "#fff9eb",
  },
  sectionTitle: {
    textAlign: "center",
    paddingVertical: 20,
    marginTop: 50,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4b472b",
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  teamCard: {
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebe3bd",
    padding: 20,
    margin: 5,
    borderRadius: 20,
    elevation: 5,
  },
  nameText: {
    color: "#4b472b",
    marginTop: 10,
    textAlign: "center",
  },
  roleText: {
    color: "#4b472b",
    textAlign: "center",
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#4b472b",
    marginTop: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
});

export default About;
