import * as React from "react";
import { StatusBar, Image, Dimensions } from "react-native";
// import SignIn from "../components/SignIn";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import DefaultAuth from "../components/DefaultAuth";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Splash from "./Splash";
import ForgotPassword from "../components/ForgotPassword";
import Root from "../navigation/Root";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { authState } = React.useContext(AuthContext);
  console.log("authState", authState);

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // marginBottom: height > 667 ? 170 : 100,
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          style={{
            flex: 1,
            width: "100%",
            height: "40%",
            position: "absolute",
            top: "60%",
            opacity: 0.5,
          }}
          source={require("../../assets/fondoapplogin.fw.png")}
        />
        {authState === "loginOk" && <Root />}
        {authState === "default" && <DefaultAuth />}
        {authState === "signIn" && <SignIn />}
        {authState === "signUp" && <SignUp />}
        {authState === "forgotPassword" && <ForgotPassword />}
        {/* {authState === "confirmSignUp" && <ConfirmSignUp />} */}
        {/* {authState === "confirmForgotPassword" && <ConfirmForgotPassword />} */}

        <StatusBar barStyle={"light-content"} />
      </KeyboardAwareScrollView>
    </>
  );
}
