import React from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { Colors } from "../constants/colors";

export default function Loading({ isVisible, text }) {
  return (
    <Overlay
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignItems: "center",
    color: Colors.primary,
    marginTop: 10,
  },
});
