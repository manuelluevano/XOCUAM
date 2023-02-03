import * as React from "react";
import { Pressable, StyleSheet, Image, View } from "react-native";
import MyText from "./MyText";
import { Ionicons } from "@expo/vector-icons";

export default function ListHeader({
  title,
  noIcon,
  iconName,
  handleNavigation,
}) {
  return (
    <View
      style={
        noIcon ? styles.container : [styles.container, { marginVertical: 20 }]
      }
    >
      <MyText type="title">{title}</MyText>
      <Pressable onPress={handleNavigation}>
        {noIcon ? (
          <MyText style={{ color: "blue" }}>Agregar</MyText>
        ) : (
          <Ionicons
            size={30}
            name={iconName}
            // color={Colors.light.tabIconSelected}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "baseline",
    justifyContent: "space-between",
  },
});
