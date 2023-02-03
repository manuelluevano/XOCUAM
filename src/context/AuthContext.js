import * as React from "react";
import { Alert, View } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, registerUser, forgotPassword } from "../API/events";

const AuthContext = React.createContext({
  authState: "default",
  setAuthState: () => {},
  user: null,
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  isLoading: false,
  firsName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  confirmPassword: "",
  setConfirmPassword: () => {},
  handleSignIn: () => {},
  handleSignUp: () => {},
  // handleConfirmSignUp: () => {},
  handleForgotPassword: () => {},
  // handleResetPassword: () => {},
  // handleResendVerificationCode: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  //INICIALIZAMOS EL VALOR DE LOS VARIABLES
  const [authState, setAuthState] = React.useState("default");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [firsName, setFirsName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Por favor ingresa tu correo y contraseña");
      return;
    }
    try {
      setIsLoading(true);
      const result = await loginApi(email, password);
      console.log(result);

      if (result.userID > 0) {
        if (result.profileID > 0) {
          //int to string
          console.log("Dato de login", result);
          // Guardamos el userName en el local storage
          AsyncStorage.setItem("@user", JSON.stringify(result.userID));
          AsyncStorage.setItem("@userName", JSON.stringify(result.userName));

          console.log("Data Saved Success in local storage");

          // Guardamos el usuario en redux
          dispatch(
            setUser({
              id: result.userID,
              userName: result.userName,
            })
          );
          setIsLoading(false);
          setAuthState("loginOk");
          console.log("Data saved Success in Redux");
        } else {
          setIsLoading(false);
          Alert.alert("Error", result.errorMsg);
        }
      } else {
        setIsLoading(false);
        console.log("Error", result.userID);
        Alert.alert("Error", "Usuario no encontrado");
      }
    } catch (error) {
      // alert(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      Alert.alert("Por favor ingresa tu correo y contraseña");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      setIsLoading(true);
      const result = await registerUser(firsName, lastName, email, password);
      console.log(result);

      Alert.alert("", result.errorMsg);
      console.log("Datos de user:", result);
      console.log("Datos ingresador", firsName, lastName, email, password);
      // Guardamos el userName en el local storage
      AsyncStorage.setItem("@user", JSON.stringify(result.userID));
      AsyncStorage.setItem(
        "@userName",
        JSON.stringify(firsName + " " + lastName)
      );

      console.log("Data Saved Success in local storage");

      // Guardamos el usuario en redux
      dispatch(
        setUser({
          id: result.userID,
          email: email,
          userName: firsName + " " + lastName,
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("", error.message);
      console.log(error);
    }
  }

  async function handleForgotPassword() {
    try {
      if (!email) {
        Alert.alert("Por favor ingresa tu correo ");
        return;
      }
      setIsLoading(true);
      const result = await forgotPassword(email);
      console.log(result);
      Alert.alert("", result.errorMsg);
      setIsLoading(false);
      setAuthState("default");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("", error.message);
    }
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        handleSignUp,
        // handleConfirmSignUp,
        isLoading,
        firsName,
        setFirsName,
        lastName,
        setLastName,
        confirmPassword,
        setConfirmPassword,
        handleForgotPassword,
        // handleResendVerificationCode,
        // handleResetPassword,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
