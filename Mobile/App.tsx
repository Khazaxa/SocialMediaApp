import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import SettingsScreen from "./Screens/SettingsScreen/SettingsScreen";
import GalleryScreen from "./Screens/GalleryScreen/GalleryScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";

const Stack = createStackNavigator<{
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Settings: undefined;
  Gallery: undefined;
  Posts: undefined;
}>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
