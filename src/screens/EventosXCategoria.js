import * as React from "react";
import { Alert, Button, View, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { listEvents } from "../API/events";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setEventosRedux } from "../features/misEventos";
import EventosCardCategoria from "../components/EventosCardCategoria";

const EventosXCategoria = ({ categoria }) => {
  const user = useSelector((state) => state.user);
  console.log("Datos user", user.id);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   console.log("Mis Eventos de redux", misEventos.eventos.length);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const route = useRoute();
  console.log("Datos Route", route);

  React.useEffect(() => {
    (async () => {
      await getEvents();
    })();
  }, []);

  async function getEvents() {
    try {
      setLoading(true);
      console.log(user.id);
      if (user.id > 0) {
        const response = await listEvents(categoria);
        // console.log(response);
        setEvents(response);
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
      }}
    >
      <FlashList
        data={events}
        renderItem={({ item }) => (
          <EventosCardCategoria userID={user.id} {...item} />
        )}
        contentContainerStyle={{ paddingVertical: 0 }}
        estimatedItemSize={200}
        ListFooterComponent={() => (
          <Button
            onPress={getEvents}
            title={loading ? "Cargando" : "Mas Eventos"}
            disabled={loading}
          />
        )}
        refreshing={loading}
        onRefresh={getEvents}
      />
    </View>
  );
};

export default EventosXCategoria;
