import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import MyText from "./MyText";
import { TextInput } from "react-native-paper";

export default function MyInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  right,
  hiddenLabel,
}) {
  return (
    <>
      <View style={styles.container}>
        {!hiddenLabel && (
          <MyText style={{ fontWeight: "bold", marginBottom: 10 }}>
            {label}
          </MyText>
        )}
        <TextInput
          mode="flat"
          placeholder={label}
          placeholderTextColor={"black"}
          style={[styles.input, styles.light]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          right={right}
          // activeOutlineColor={Colors.light.movilsource}
          activeUnderlineColor={Colors.light.primary}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    // paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 0.4,
  },
  dark: {
    backgroundColor: Colors.dark.text,
    borderColor: Colors.dark.text + "80",
    color: Colors.light.movilsource,
    backgroundColor: "#F2F2F2",
  },
  light: {
    backgroundColor: Colors.dark.text,
    borderColor: Colors.dark.text + "80",
    color: Colors.light.movilsource,
    backgroundColor: "#F2F2F2",
  },
});
