import * as React from "react";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { AuthContext } from "../context/AuthContext";
import { View } from "react-native";

export default function DefaultAuth() {
  const { setAuthState } = React.useContext(AuthContext);

  return (
    <>
      <React.Fragment>
        <View style={{ paddingHorizontal: 10, marginBottom: 100 }}>
          <MyText type="title">Cartelera UAMX</MyText>

          <MyButton
            type="secondary"
            title="Iniciar Sesion"
            onPress={() => {
              setAuthState("signIn");
            }}
          />
          <MyButton
            title={"Crear Cuenta"}
            onPress={() => setAuthState("signUp")}
          />
        </View>
      </React.Fragment>
    </>
  );
}
