import * as React from "react";
import {
  View,
  useColorScheme,
  StyleSheet,
  Switch,
  Alert,
  Pressable,
} from "react-native";
import MyText from "./MyText";
import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   updateUserNotificationToken,
// } from "../utils/userOperation";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { resetNotificationToken } from "../features/user";
import { resetUser } from "../features/user";
import { isDevice } from "expo-device";

export default function ProfilePermissions() {
  const user = useSelector((state) => state.user);
  const [tokenID, setTokenID] = React.useState(undefined);
  console.log("datos de user", user);
  const theme = useColorScheme();
  const dispatch = useDispatch();
  console.log("token in localStorage", tokenID);

  //OBETNER EL TOKEN DE NOTIFICATION
  React.useEffect(() => {
    async function checkFirstLaunch() {
      const tokenID = await AsyncStorage.getItem("@token");
      setTokenID(tokenID);
      console.log("Token in localStorage", tokenID);
    }
    checkFirstLaunch();
  }, []);

  async function handleToggleNotifications() {
    if (isDevice) {
      if (user.notificationToken === null || tokenID === undefined) {
        const token = await registerForPushNotificationsAsync();
        console.log("Datos del token", token);
        setTokenID(token);
        await AsyncStorage.setItem("@token", token);
        // if (token !== null || token) {
        //   setTokenID(user.notificationToken);
        //   await AsyncStorage.getItem("@token", token);
        // }
      } else {
        setTokenID(undefined);
        await AsyncStorage.removeItem("@token");
        console.log("Token eliminado");
      }
    } else {
      alert("Esto no funciona en simulador!");
    }
  }

  //CERRAR SESSION
  async function handleSignOut() {
    try {
      await AsyncStorage.removeItem("@user");
      console.log("Close seesion Success");
      dispatch(resetUser());
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <MyText
        type="caption"
        style={{ fontWeight: "600", color: Colors[theme].text + "40" }}
      >
        PERMISOS
      </MyText>
      <InfoField
        theme={theme}
        label={"Notificaciones"}
        value={tokenID ? true : false}
        handleUpdate={handleToggleNotifications}
      />
      <Pressable
        onPress={handleSignOut}
        style={[
          styles.fieldContainer,
          { borderBottomColor: Colors[theme].text + "80", paddingVertical: 22 },
        ]}
      >
        <MyText
          type="caption"
          style={{
            fontWeight: "500",
            color: Colors[theme].red,
            paddingRight: 10,
          }}
        >
          Cerrar Sesion
        </MyText>
      </Pressable>
    </View>
  );
}

function InfoField({ label, value, theme, handleUpdate }) {
  return (
    <View
      style={[
        styles.fieldContainer,
        { borderBottomColor: Colors[theme].text + "80" },
      ]}
    >
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <Switch value={value} onChange={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
  },
});
