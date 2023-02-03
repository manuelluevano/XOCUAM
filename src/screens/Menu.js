import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../style/global";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../constants/colors";

const Menu = () => {
  const navigation = useNavigation();
  const cargarMas = (name, cat) => {
    console.log("Presionaste", name);
    const nombre = name;
    let categoria = cat;
    navigation.navigate("Categoria", { nombre, categoria });
  };

  const paginaCEUX = (web) => {
    navigation.navigate("WEB", { web });
  };

  const paginaContacto = () => {
    navigation.navigate("Contacto");
  };

  return (
    <>
      <View style={globalStyles.banner}>
        <Text style={globalStyles.textBanner2}>CATEGORIAS</Text>
      </View>

      <KeyboardAwareScrollView>
        <Pressable onPress={() => cargarMas("Actividades Academicas", 1)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Ionicons name={"school"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Actividades Académicas</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => cargarMas("Actividades Culturales", 2)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Ionicons name={"school"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Actividades Culturales</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>

        <Pressable onPress={() => cargarMas("Divulgacion de la ciencia", 3)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Foundation
              name={"magnifying-glass"}
              size={20}
              color={Colors.primary}
            />
            <Text style={style.textEnlaces}>Divulgación de la ciencia</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => cargarMas("Salud y Deporte", 4)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <FontAwesome name={"heartbeat"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Salud y Deporte</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => cargarMas("Convocatorias", 5)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <MaterialIcons
              name={"insert-invitation"}
              size={20}
              color={Colors.primary}
            />
            <Text style={style.textEnlaces}>Convocatorias</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>

        <Pressable onPress={() => cargarMas("Novedades Editoriales", 6)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Entypo name={"news"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Novedades Editoriales</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => cargarMas("Cursos y Talleres", 7)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <FontAwesome5
              name={"chalkboard-teacher"}
              size={20}
              color={Colors.primary}
            />
            <Text style={style.textEnlaces}>Cursos y Talleres</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => paginaCEUX("CEUX")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Foundation name={"web"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Página Web CEUX</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => paginaCEUX("UAM")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Foundation name={"web"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>UAM Xochimilco</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
        <Pressable onPress={() => paginaContacto()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <AntDesign name={"contacts"} size={20} color={Colors.primary} />
            <Text style={style.textEnlaces}>Contacto</Text>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </Pressable>
      </KeyboardAwareScrollView>
    </>
  );
};

const style = StyleSheet.create({
  textEnlaces: {
    textAlign: "left",
    fontSize: 25,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default Menu;
