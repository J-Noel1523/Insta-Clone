import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/AuthScreens/Login";
import Signup from "../screens/AuthScreens/Signup";
import Welcome from "../screens/AuthScreens/Welcome";
import ProfilePicture from "../screens/AuthScreens/ProfilePicture";
import StackNavigator from "./StackNavigator";
//import AppLoading from "expo";
import { useFonts } from "expo-font";
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    logoFont: require("../assets/fonts/JustAnotherHand-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, title: "Login" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "Signup",
              headerStyle: {
                backgroundColor: "#46A0F5",
              },
            }}
          />
          <Stack.Screen
            name="ProfilePicture"
            component={ProfilePicture}
            options={{
              title: "ProfilePicture",
              headerStyle: {
                backgroundColor: "#46A0F5",
              },
            }}
          />
          <Stack.Screen
            name="StackNavigator"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
