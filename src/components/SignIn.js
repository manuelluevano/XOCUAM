import * as React from "react";
import { useState } from "react";
import { View, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";

//COMPONENTS
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import MyText from "./MyText";
import Colors from "../constants/colors";
const Login = () => {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    React.useContext(AuthContext);
  //EYE PASSWORD
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <MyText type="title">Iniciar Sesión</MyText>
        <MyInput
          label={"Correo Electrónico"}
          //   value={email}
          onChangeText={setEmail}
        />
        <MyInput
          label={"Contraseña"}
          secureTextEntry={!showPass}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPass ? "eye" : "eye-off"}
              onPress={() => setShowPass(!showPass)}
            />
          }
        />
        <Pressable
          onPress={() => setAuthState("forgotPassword")}
          style={{ padding: 10 }}
        >
          <MyText
            type="caption"
            style={{
              color: Colors.light.primary,
              position: "absolute",
              right: 0,
              top: -15,
            }}
          >
            Olvide mi Contraseña
          </MyText>
        </Pressable>
        <MyButton
          type="primary"
          title={isLoading ? "Cargando..." : "Iniciar Sesion"}
          disabled={isLoading ? true : false}
          onPress={handleSignIn}
        />
        <MyButton
          type="secondary"
          title="Atras"
          onPress={() => {
            setAuthState("default");
          }}
          disabled={isLoading}
        />
      </View>
    </>
  );
};

export default Login;
