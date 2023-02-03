import * as React from "react";
import { Button, View, Dimensions, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { listEvents, eventosSuscritos } from "../API/events";
import EventosCard from "../components/EventosCard";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { setEventosRedux } from "../features/misEventos";
import { globalStyles } from "../style/global";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

console.log(windowHeight);

const Eventos = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const misEventos = useSelector((state) => state.misEventos);
  // console.log("Mis Eventos de redux", misEventos.eventos.length);
  const [events, setEvents] = React.useState([]);
  const [eventsDateNotification, setEventsDateNotification] = React.useState(
    []
  );
  const [loading, setLoading] = React.useState(false);
  const route = useRoute();

  React.useEffect(() => {
    (async () => {
      await getEvents();
    })();
  }, []);

  // VERIFICAR SI ES LA PRIMERA VEZ EN LA APP
  React.useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
      if (firstLaunch === null) navigation.navigate("Onboarding");
    }
    checkFirstLaunch();
  }, []);

  async function getEvents() {
    try {
      setLoading(true);
      if (route?.params?.user.id > 0) {
        const response = await eventosSuscritos(route.params?.user.id);
        // console.log("eventos suscritos", response);
        dispatch(setEventosRedux(response));
      } else {
        // Agregamos la categoria 0 para extraer todos los eventos
        let cat = 0;
        const response = await listEvents(cat);
        setEvents(response.slice(0, 15));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMoreEvents() {
    getEvents();
    try {
      setLoading(true);
      if (route?.params?.user.id > 0) {
        const response = await eventosSuscritos(route.params?.user.id);
        setEvents(response);
      } else {
        // Agregamos la categoria 0 para extraer todos los eventos
        let cat = 0;
        const response = await listEvents(cat);
        setEvents(response.slice(0, 30));
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        // paddingHorizontal: 10,
      }}
    >
      <View style={globalStyles.bannerEventos}>
        <Image
          style={{
            width: windowHeight > 900 ? "45%" : "40%",
            alignSelf: "center",
            height: "100%",
            marginTop: windowHeight > 800 ? 8 : 9,
          }}
          source={require("../../assets/logoUAMX.png")}
        />
      </View>

      <FlashList
        data={route?.params?.user.id > 0 ? misEventos.eventos : events}
        renderItem={({ item }) => (
          <EventosCard id={route?.params?.user.id} {...item} />
        )}
        contentContainerStyle={{ paddingVertical: 40 }}
        estimatedItemSize={200}
        ListFooterComponent={() => (
          <Button
            onPress={fetchMoreEvents}
            title={loading ? "Cargando" : "Mas Eventos"}
            disabled={loading}
          />
        )}
        refreshing={loading}
        onRefresh={fetchMoreEvents}
      />
      {/* <Button
        title={"Enviar Notificacion"}
        onPress={obtenerFechaNotification}
      /> */}
    </View>
  );
};

export default Eventos;
