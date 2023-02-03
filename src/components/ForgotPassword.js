import * as React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

//COMPONENTS
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import MyText from "./MyText";
const ForgotPassword = () => {
  const {
    setAuthState,
    setEmail,
    setPassword,
    handleForgotPassword,
    isLoading,
  } = React.useContext(AuthContext);

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <MyText type="title">Recuperar Contraseña</MyText>
        <MyInput
          label={"Correo Electrónico"}
          //   value={email}
          onChangeText={setEmail}
        />

        <MyButton
          type="primary"
          title={isLoading ? "Cargando..." : "Recuperar"}
          disabled={isLoading ? true : false}
          onPress={handleForgotPassword}
        />
        <MyButton
          type="secondary"
          title="Atras"
          onPress={() => {
            setAuthState("signIn");
          }}
          disabled={isLoading}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    marginBottom: 20,
    width: "70%",
    resizeMode: "contain",
  },
  back: {
    position: "absolute",
    left: 0,
    top: "40%",
    right: 0,
    bottom: 0,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});

export default ForgotPassword;
