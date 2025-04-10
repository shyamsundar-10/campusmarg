// app/Live.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeStudent from "./HomeStudent";
import HomeDriver from "./HomeDriver";

const Live = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const data = await AsyncStorage.getItem("currentUser");
      const user = JSON.parse(data || "{}");
      setUserType(user.usertype);
    };
    fetchUserType();
  }, []);

  if (!userType) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return userType === "student" ? <HomeStudent /> : <HomeDriver />;
};

export default Live;
