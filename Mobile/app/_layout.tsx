import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";


export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <RootLayoutNav />
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="post/[id]" 
        options={{ 
          headerShown: true,
          title: "Post",
          headerBackTitle: "Back"
        }} 
      />
      <Stack.Screen 
        name="profile/[id]" 
        options={{ 
          headerShown: true,
          title: "Profile",
          headerBackTitle: "Back"
        }} 
      />
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          headerShown: true,
          title: "Edit Profile",
          headerBackTitle: "Back",
          presentation: "modal"
        }} 
      />
    </Stack>
  );
}