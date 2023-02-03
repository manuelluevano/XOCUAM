import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import UserCard from "../components/UserCard";
import { globalStyles } from "../style/global";
import ProfilePermissions from "../components/profilePermission";

const Perfil = () => {
  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.textBanner2}>MI PERFIL</Text>
      </View>

      <View style={globalStyles.screenContainer}>
        <UserCard />
        <ProfilePermissions />
      </View>
    </>
  );
};

export default Perfil;
