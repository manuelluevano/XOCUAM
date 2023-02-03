import * as React from "react";
import MyText from "../components/MyText";
import { View } from "../components/themed/Themed";
import { Image, StyleSheet, View as DefaultView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../style/global";
import { Button } from "react-native-elements";
// import { updateUserNotificationToken } from "../utils/userOperation";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";

export default function Onboarding() {
  const [tokenID, setTokenID] = React.useState(undefined);

  const navigation = useNavigation();

  async function handleOnContinue() {
    try {
      await AsyncStorage.setItem("@firstLaunch", "true");

      const token = await registerForPushNotificationsAsync();
      console.log("Datos del token", token);
      if (token !== undefined) {
        navigation.goBack();
        setTokenID(token);
        await AsyncStorage.setItem("@token", token);
        console.log("Token in localStorage", tokenID);
      }
    } catch (e) {
      console.log("Onboarding error", e);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <MyText style={styles.title} type="title">
        Bienvenido a
      </MyText>
      <MyText style={[styles.title, { marginBottom: 30 }]} type="title">
        Cartelera UAMX
      </MyText>
      {appFeatures.map((feature, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={feature.icon} style={styles.icon} />
          <DefaultView style={styles.textWrapper}>
            <MyText type="caption" style={{ fontWeight: "bold" }}>
              {feature.title}
            </MyText>
            <MyText type="caption">{feature.description}</MyText>
          </DefaultView>
        </View>
      ))}
      <Button
        style={{
          marginTop: 50,
          borderRadius: 10,
        }}
        title="Continue"
        onPress={handleOnContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 13,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 13,
  },
  textWrapper: {
    flexShrink: 1,
  },
});

const appFeatures = [
  {
    icon: require("../../assets/notification.png"),
    title: "Recibe Notificaciones",
    description: "Recibe notificaciones sobre tus eventos",
  },
  {
    icon: require("../../assets/eventos.png"),
    title: "Eventos Escolares",
    description: "Recibe notificaciones sobre tus eventos",
  },
  //   {
  //     icon: require("../../assets/notification.png"),
  //     title: "Recibe Notificaciones",
  //     description: "Recibe notificaciones sobre tus eventos",
  //   },
];
