import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/colors";

//SCREENS
import Eventos from "../screens/Eventos";
import InfoEvent from "../screens/InfoEvent";
import Perfil from "../screens/Perfil";
import MisEventos from "../screens/MisEventos";
import Cauce from "../screens/Cauce";
import Menu from "../screens/Menu";
import Onboarding from "../screens/Onboarding";
import Categoria from "../screens/Categoria";
import CEUX from "../components/webview/Ceux";
import Contacto from "../components/webview/Contacto";
import PostContentLink from "../components/webview/PostContentLink";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Root() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <BottomNavigation />
    </NavigationContainer>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: Colors.primary,
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Eventos") {
            iconName = focused ? "calendar-o" : "calendar-o";
          } else if (route.name === "Perfil") {
            iconName = focused ? "user-circle" : "user-circle";
          } else if (route.name === "Cauce") {
            iconName = focused ? "location-arrow" : "location-arrow";
          } else if (route.name === "Menu") {
            iconName = focused ? "bars" : "bars";
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Eventos"
        component={EventosStack}
        options={{
          headerShown: false,
          // tabBarBadge: 3,
          // tabBarBadgeStyle: { backgroundColor: "red", color: "yellow" },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          headerShown: false,
          // tabBarBadge: 3,
          // tabBarBadgeStyle: { backgroundColor: "blue", color: "yellow" },
        }}
      />
      <Tab.Screen
        name="Cauce"
        component={Cauce}
        options={{
          headerShown: false,
          // tabBarBadge: 3,
          // tabBarBadgeStyle: { backgroundColor: "blue", color: "yellow" },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          headerShown: false,
          // tabBarBadge: 3,
          // tabBarBadgeStyle: { backgroundColor: "blue", color: "yellow" },
        }}
      />
    </Tab.Navigator>
  );
}

function EventosStack() {
  return (
    <Stack.Navigator initialRouteName="evento">
      <Stack.Screen
        name="evento"
        component={Eventos}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Informacion del Evento"
        component={InfoEvent}
        options={{
          presentation: "modal",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="PostContentLink"
        component={PostContentLink}
        options={{
          headerBackTitle: "Atras",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator initialRouteName="Mi Perfil">
      <Stack.Screen
        name="Mi Perfil"
        component={Perfil}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Informacion del Evento"
        component={InfoEvent}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Mis Eventos"
        component={MisEventos}
        options={{
          presentation: "card",
          headerBackTitle: "Atras",
        }}
      />
    </Stack.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu Stack"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categoria"
        component={Categoria}
        options={{
          // presentation: "card",
          headerBackTitle: "Atras",
        }}
      />
      <Stack.Screen
        name="WEB"
        component={CEUX}
        options={{
          // presentation: "card",
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          // presentation: "card",
          headerBackTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
