import * as React from "react";
import { View, Text } from "react-native";
import ListHeader from "../components/ListHeader";
import { useRoute } from "@react-navigation/native";
import EventosXCategoria from "./EventosXCategoria";

const Categoria = () => {
  const route = useRoute();
  let nombre = route.params.nombre;
  console.log("Categoria", route.params.categoria);
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ListHeader title={nombre} />
      <EventosXCategoria categoria={route.params.categoria} />
    </View>
  );
};

export default Categoria;
