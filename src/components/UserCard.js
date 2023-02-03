import * as React from "react";
import MyText from "../components/MyText";
import { CLOUD_NAME, UPLOAD_PRESET } from "@env";
import {
  Image,
  View,
  Pressable,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";

export default function UserCard() {
  const user = useSelector((state) => state.user);
  console.log("User", user);
  const [picture, setPicture] = React.useState("");
  const navigation = useNavigation();

  // BUSCAR IMAGEN LOCALSTORAGE
  React.useEffect(() => {
    const getphoto = async () => {
      const photo = await AsyncStorage.getItem("@pic");
      if (photo !== null) setPicture(photo);
    };
    getphoto();
  }, []);
  //subr imagen
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (!status === "granted") {
        alert("Sorry, we need permission ");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64: true,
    });

    let base64Img = `data:image/jpg;base64,${result.base64}`;
    let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;
    const data = new FormData();
    data.append("file", base64Img);
    data.append("upload_preset", UPLOAD_PRESET);
    // let data = {
    //   file: base64Img,
    //   upload_preset: UPLOAD_PRESET,
    // };

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: data,
        });
        const json = await response.json();
        // SAVE PICTURE LOCALSTORAGE
        AsyncStorage.setItem("@pic", json.url);
        console.log("Response from cloudinary", json);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(picture);

  return (
    <>
      {/* {picture && ( */}
      <View style={styles.container}>
        <Pressable onPress={pickImage}>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.image} />
          ) : (
            <>
              <View style={styles.fallback}>
                <MyText style={styles.initialLetter}>{"L"}</MyText>
              </View>
              <MyText type="caption" style={{ color: "blue" }}>
                Agregar Imagen
              </MyText>
            </>
          )}
        </Pressable>

        <MyText style={{ fontWeight: "bold", marginBottom: 30, marginTop: 10 }}>
          {user.userName}
        </MyText>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 45,
            padding: 10,
            marginVertical: 10,
            borderRadius: 8,
          }}
          title={"Mis Eventos"}
          onPress={() => {
            navigation.navigate("Mis Eventos", { user });
          }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>Mis Eventos</Text>
        </TouchableOpacity>

        {/* <MyButton title={"Cerrar Sesión"} onPress={handleSignOut} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  fallback: {
    backgroundColor: "lightcoral",
    width: 100,
    height: 100,
    // borderRadius: Platform.OS === "ios" ? "50%" : null,
    marginBottom: 6,
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: Platform.OS === "ios" ? "50%" : null,
    marginBottom: 6,
  },
  initialLetter: {
    fontSize: 60,
    lineHeight: 100,
    textAlign: "center",
    color: "white",
  },
});
