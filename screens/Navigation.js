import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import AdminScreen from "../screens/AdminScreen";
import EmpScreen from "../screens/EmpScreen";
import RegistrarEm from "./ScreensAdmin/RegistrarEm";
import GesAsis from "./ScreensAdmin/GesAsis";
import Reportes from "./ScreensAdmin/Reportes";
import Mhorarios from "./ScreensEmp/Mhorarios";
import Mdatos from "./ScreensEmp/Mdatos";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Emp" component={EmpScreen} />
        <Stack.Screen name="RegistrarEm" component={RegistrarEm} />
        <Stack.Screen name="GesAsis" component={GesAsis} />
        <Stack.Screen name="Reportes" component={Reportes} />
        <Stack.Screen name="Mhorarios" component={Mhorarios} />
        <Stack.Screen name="Mdatos" component={Mdatos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;