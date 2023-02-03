import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { AuthContext } from "../context/AuthContext";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

export default function SignUp() {
  const [showPass, setShowPass] = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);

  const {
    setAuthState,
    setEmail,
    setFirsName,
    setLastName,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    isLoading,
  } = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 10 }}>
        <MyText type="title">Registrarse</MyText>
        <MyInput label={"Nombres"} onChangeText={setFirsName} />
        <MyInput label={"Apellidos"} onChangeText={setLastName} />
        <MyInput label="Correo Electrónico" onChangeText={setEmail} />
        <MyInput
          label="Contraseña"
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          right={
            <TextInput.Icon
              icon={showPass ? "eye" : "eye-off"}
              onPress={() => setShowPass(!showPass)}
            />
          }
        />
        <MyInput
          label="Validar Contraseña"
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPass2}
          right={
            <TextInput.Icon
              icon={showPass2 ? "eye" : "eye-off"}
              onPress={() => setShowPass2(!showPass2)}
            />
          }
        />
        <MyButton
          onPress={handleSignUp}
          title={isLoading ? "Cargando..." : "Registrarse"}
          disabled={isLoading ? true : false}
        />
        <MyButton
          type="secondary"
          title="Atras"
          onPress={() => setAuthState("default")}
        />
      </View>
    </React.Fragment>
  );
}
