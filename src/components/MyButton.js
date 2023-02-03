import {
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Colors from "../constants/colors";

export default function MyButton({ title, onPress, type = "primary", style }) {
  const theme = useColorScheme();

  const buttonStyle =
    theme === "light" && type === "primary"
      ? styles.primaryLight
      : theme === "light" && type === "secondary"
      ? styles.secondaryLight
      : theme === "dark" && type === "primary"
      ? styles.primaryDark
      : styles.secondaryDark;

  const textStyle =
    theme === "light" && type === "primary"
      ? Colors.light.background
      : theme === "light" && type === "secondary"
      ? Colors.dark.text
      : theme === "dark" && type === "secondary"
      ? Colors.dark.text
      : Colors.light.background;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textStyle }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
  primaryLight: {
    backgroundColor: Colors.light.text,
  },
  secondaryLight: {
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  primaryDark: {
    backgroundColor: Colors.dark.text,
  },
  secondaryDark: {
    backgroundColor: "white",
    borderWidth: 1,
    color: "black",

    borderColor: Colors.dark.text,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
