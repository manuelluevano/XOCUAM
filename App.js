import * as React from "react";
import { useSelector, Provider } from "react-redux";
import { store } from "./src/app/store";
import AuthScreen from "./src/screens/Auth";
import Root from "./src/navigation/Root";
import { setNotificationHandler } from "expo-notifications";
import { setUser } from "./src/features/user";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
//NOTIFICAIONES
setNotificationHandler({
  handleNotification: async () => ({
    // If we are in the app, will show a notification or not
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// CREAMOS UN WRAPPER PARA ENVOLVER TODA LA APP EN EL PROVIDER
export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  //REVISAR SI EXISTE USUARIO REGISTRADO PREVIAMENTE
  const user = useSelector((state) => state.user);
  console.log("Datos de user en storage:", user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("@user");
        const userName = await AsyncStorage.getItem("@userName");

        if (user !== null) {
          console.log("Data Restore Success", user);
          dispatch(
            setUser({
              id: user,
              userName: userName,
            })
          );
        } else {
          console.log("No Data Restore ");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return user.id ? <Root user={user} /> : <AuthScreen />;
}
