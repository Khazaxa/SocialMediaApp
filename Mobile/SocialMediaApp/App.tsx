import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";

const Stack = createStackNavigator<{
  Login: undefined;
  Home: undefined;
  Register: undefined;
}>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
