import React from "react";
import { useRoute } from "@react-navigation/native";
import Eventos from "./Eventos";

const MisEventos = () => {
  const route = useRoute();
  console.log("Datos Route: ", route.params.user.id);
  return <Eventos id={route.params.user.id} />;
};

export default MisEventos;
