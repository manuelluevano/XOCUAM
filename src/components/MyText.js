import * as React from "react";
import { Text, StyleSheet } from "react-native";

export default function MyText({ children, type = "body", style }) {
  return <Text style={[styles[type], style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  body: {
    fontSize: 17,
  },
  caption: {
    fontSize: 14,
  },
  separation: {
    fontSize: 25,
  },
});
