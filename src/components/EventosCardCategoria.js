import * as React from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";
import MyText from "./MyText";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/colors";

export default function EventosCardCategoria({
  userID,
  id,
  EventId,
  EventName,
  EventStartTime,
  imageurl,
  EventStartDate,
  eventsubscriptionid,
}) {
  const navigation = useNavigation();
  console.log("User: ", userID);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.postHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image style={styles.img} source={{ uri: imageurl }} />
            <View style={{ width: "50%" }}>
              <MyText style={styles.title}>{EventName}</MyText>

              <View style={{ alignContent: "center" }}>
                <MyText style={{ paddingVertical: 10 }}>
                  <Fontisto name={"clock"} size={15} color={Colors.primary} />

                  {" " + EventStartTime.slice(0, -3)}
                </MyText>
              </View>
              <MyText numberOfLines={1} style={styles.body}>
                <Fontisto name={"date"} size={15} color={Colors.primary} />

                {" " + EventStartDate}
              </MyText>
            </View>
            <Ionicons
              size={30}
              name={"add-circle"}
              color={Colors.light.primary}
              onPress={() => {
                navigation.navigate("Informacion del Evento", {
                  id,
                  EventId,
                  EventName,
                  EventStartTime,
                  imageurl,
                  EventStartDate,
                  eventsubscriptionid,
                });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 17,
  },
  body: {
    fontSize: 16,
    color: "gray",
  },
  img: {
    width: 100,
    height: 70,
    borderRadius: 5,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
