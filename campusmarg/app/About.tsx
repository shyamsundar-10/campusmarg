import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, Text, Card, Avatar } from "@ui-kitten/components";
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
  return (
    <ScrollView style={styles.container}>
      <Layout>
        <Text category="h3" style={styles.sectionTitle}>
          Development Team
        </Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <Card key={index} style={styles.teamCard}>
              <Avatar source={member.image} style={styles.avatar} />
              <Text style={{ textAlign: "center" }} category="h6">
                {member.name}
              </Text>
              <Text style={{ textAlign: "center" }} category="s1">
                {member.role}
              </Text>
            </Card>
          ))}
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
    padding: 20,
    backgroundColor: "white",
  },
  sectionTitle: {
    textAlign: "center",
    padding: 20,
    marginBottom: 20,
    fontWeight: "bold",
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
    padding: 15,
    margin: 5,
    borderRadius: 25,
    elevation: 5,
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    color: "gray",
    margin: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default About;
