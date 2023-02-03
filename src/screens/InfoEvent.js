import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { eventoSeleccionado } from "../API/events";
import { registroEvento, EliminarEvento } from "../API/events";
import { useNavigation } from "@react-navigation/core";
import {
  deleteEventosReducer,
  addEventosReducer,
} from "../features/misEventos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import { eventosSuscritos } from "../API/events";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import ImageView from "react-native-image-viewing";
import * as Notification from "expo-notifications";

const InfoEvent = (props) => {
  const dispatch = useDispatch();
  const misEventos = useSelector((state) => state.misEventos);
  // console.log("Mis Eventos en redux", misEventos);
  const [eventosDetails, setEventosDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { route } = props;
  const user = useSelector((state) => state.user);
  // console.log("Datos de user", user.id);
  // console.log("Dartos del route", route.params?.userID);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [dateNotification, setDate] = React.useState(new Date());

  //OBETNER EL TOKEN DE NOTIFICATION
  useEffect(() => {
    async function checkFirstLaunch() {
      const token = await AsyncStorage.getItem("@token");
      console.log("Token in localStorage", token);
      setToken(token);
    }
    checkFirstLaunch();
    obtenerEventosUser();
    // obtenerMisEventos();
  }, []);

  var fechaEvento = route.params.EventStartDate.substring(8, 10);
  var fechaActual = new Date().toLocaleString().substring(2, 3);

  //ENVIAMOS NOTIFICACION DE EVENTOS QUE ESTEN A 15 DIAS DE INICIAR
  //PRIMERO OBTENEMOS LOS EVENTOS DEL USUARIO
  async function obtenerEventosUser() {
    try {
      const response = await eventosSuscritos(user.id);
      // console.log("Eventos del usuario:", response);
      response.forEach((element) => {
        console.log(element.EventStartDate);
      });
    } catch (error) {}
  }

  useEffect(() => {
    (async () => {
      await obtenerEvento();
    })();
  }, []);

  const date = new Date(eventosDetails.EventStartDate);
  const formattedDate = date.toLocaleDateString("es-GB", {
    day: "numeric",
    month: "long",
    // year: 'numeric',
  });

  const obtenerEvento = async () => {
    try {
      const response = await eventoSeleccionado(route.params.EventId);
      setEventosDetails(response);
      setLoading(false);
    } catch (error) {}
  };

  // async function sendPushNotification() {
  //   try {
  //     console.log("Enviando Notification..");
  //     // const trigger = new Date(Date.now() + 60 * 60 * 1000);
  //     // const trigger = new Date();
  //     // console.log("NOTIFICATION", trigger);
  //     // trigger.setMinutes(0);
  //     // trigger.setSeconds(0);
  //     await Notification.scheduleNotificationAsync({
  //       content: {
  //         title: "Code With Beto!",
  //         body: "This is a test notification",
  //       },
  //       trigger: {
  //         seconds: 5,
  //         repeat: true,
  //       },
  //       // trigger: {
  //       //   hour: 2,
  //       //   minute: 25,
  //       //   repeats: true,
  //       // },
  //     });
  //   } catch (error) {
  //     alert("Notification error");
  //   }
  //   //   // console.log(route.params);
  //   //   // if (fechaEvento - fechaActual <= 9) {
  //   //   //   console.log(
  //   //   //     "Fecha del evento",
  //   //   //     fechaEvento,
  //   //   //     " ",
  //   //   //     "fecha actual",
  //   //   //     fechaActual
  //   //   //   );
  //   //   // }
  //   //   // if (token !== null) {
  //   // try {
  //   //   console.log("Enviando Notificación");
  //   //   const message = {
  //   //     to: token,
  //   //     sound: "default",
  //   //     title: "Hola ",
  //   //     body: "Quedan " + "🥳",
  //   //     data: { someData: "goes here" },
  //   //   };
  //   //   await fetch("https://exp.host/--/api/v2/push/send", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       Accept: "application/json",
  //   //       "Accept-encoding": "gzip, deflate",
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify(message),
  //   //     categoryIdentifier: "replyMessage",
  //   //   });
  //   // } catch (error) {}
  // }

  async function handleNotification() {
    // const newDate = new Date(Date.now() + 60 * 60 * 1000);

    // console.log("Fecha actual", newDate);
    // const fecha
    // const trigger = new Date(fecha).getTime() + 24 * 60 * 60 * 1000;

    //ENVIAR NOTIFICATION AL SIGUIENTE MINUTO
    // const trigger = new Date(Date.now() + 1 * 60 * 1000);
    // const trigger = new Date("2023-02-03T08:03:32.352Z");

    var dateobj = new Date();

    var B = dateobj.toISOString();

    // trigger.setMinutes(0);
    // trigger.setSeconds(0);
    // new Date('October 15, 1996 05:35:32');
    console.log("Fecha Evento", eventosDetails.EventStartDate);
    console.log("Fecha Seleccionada", B);
    try {
      const id = await Notification.scheduleNotificationAsync({
        content: {
          title: "Notificacion!",
          body: "This is a test notification",
        },
        trigger,
        // trigger: {
        //   seconds: 5,
        //   repeats: false,
        // },
      });
      alert(`Notification shcedualed!, ${id}`);
    } catch (err) {
      alert("The notification failed to schedule, make sure the hour is valid");
    }
  }
  //REGISTRARSE AL EVENTO

  async function eventRegister() {
    try {
      setLoading(true);
      const response = await registroEvento(route.params.EventId, user.id);
      // console.log("registro del evento", route.params);
      dispatch(addEventosReducer(route.params));
      console.log("Registro del evento", route.params.EventStartDate);
      Alert.alert("", response.errorMsg);
      //ENVIAMOS NOTIFICATION
      await handleNotification(route.params.EventStartDate);
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  //ELIINAR EVENTO
  async function deleteEvent() {
    try {
      setLoading(true);
      const response = await EliminarEvento(route.params.eventsubscriptionid);
      console.log("respuesta registro", response);
      Alert.alert("", response.errorMsg);
      // ELIMINAMOS EL EVENTO DEL REDUX
      console.log("Evento Eliminado", route.params.eventsubscriptionid);
      dispatch(deleteEventosReducer(route.params.eventsubscriptionid));
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      // console.log("error deleting event");
    }
  }
  console.log(eventosDetails);

  const images = [
    {
      uri: eventosDetails.imageurl,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const source = {
    html: `
    <div style="text-align:justify;">
    ${eventosDetails.PostContent}
    </div>
    `,
  };
  const { width } = useWindowDimensions();

  return (
    <>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <ImageView
            images={images}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <View style={styles.box}>
                <Fontisto
                  name="date"
                  type="material-community"
                  color="gray"
                  size={25}
                />
                <View style={styles.date}>
                  <Text style={styles.textDateEvent}>{formattedDate}</Text>
                </View>
              </View>
              <View style={styles.box}>
                <FontAwesome5
                  name="clock"
                  type="material-community"
                  color="gray"
                  size={25}
                />
                <View style={styles.date}>
                  <Text style={styles.textDateEvent}>
                    {eventosDetails.EventStartTime}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.banner}>
              <Text style={styles.textEventName}>
                {eventosDetails.EventName}
              </Text>
            </View>
            <View style={styles.containerPostContent}>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image
                  style={styles.img}
                  source={{ uri: eventosDetails.imageurl }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                <RenderHtml contentWidth={width} source={source} />
              </Text>
              <View style={styles.containerPostContent}>
                {route.params?.userID ? (
                  <TouchableOpacity
                    disabled={isLoading}
                    style={{
                      backgroundColor: Colors.primary,
                      borderRadius: 5,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 45,
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 8,
                    }}
                    onPress={deleteEvent}
                  >
                    <Text style={{ color: "white", fontSize: 17 }}>
                      Eliminar Evento
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={isLoading}
                    style={{
                      backgroundColor: Colors.primary,
                      borderRadius: 5,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 45,
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 8,
                    }}
                    onPress={eventRegister}
                    // onPress={handleNotification}
                  >
                    <Text style={{ color: "white", fontSize: 17 }}>
                      Agregar Evento
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 50,
    // alignItems: 'center',
  },
  containerImg: {
    width: "100%",
  },
  img: {
    height: 200,
    resizeMode: "cover",
    marginBottom: 30,
  },
  containerTitle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
    width: "100%",
  },
  box: {
    marginRight: 16,
    alignItems: "center",
  },
  textDateEvent: {
    fontSize: 17,
    color: "gray",
    marginTop: 10,
  },
  textEventName: {
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    color: "white",
  },
  banner: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  containerPostContent: {
    marginTop: 10,
    // alignItems: "center",
    // backgroundColor: "white",
    marginHorizontal: 20,
  },
  link: {
    marginLeft: 10,
    color: "white",
  },
});

export default InfoEvent;
