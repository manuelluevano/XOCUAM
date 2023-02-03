import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log(windowHeight);

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  simpleContainer: {
    flex: 1,
    backgroundColor: Colors.ligth,
  },
  banner: {
    width: "100%",
    backgroundColor: Colors.primary,
    padding: 10,
  },
  bannerEventos: {
    backgroundColor: Colors.primary,
    padding: 1,
    // justifyContent: "center",
    // paddingTop: 1,
    // paddingBottom: 1,
    // width: "100%",
    height: windowHeight > 900 ? "24%" : "20%",
  },
  textBanner: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    // fontFamily: "Cochin",
    color: "white",
  },
  textBanner2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    // fontFamily: "Cochin",
    color: "white",
    marginTop: 40,
  },
});
