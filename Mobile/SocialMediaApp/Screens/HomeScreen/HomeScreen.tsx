import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<
  {
    Home: undefined;
    Settings: undefined;
    Gallery: undefined;
    Posts: undefined;
  },
  "Home"
>;

export type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />
      <Button
        title="Go to Gallery"
        onPress={() => {
          navigation.navigate("Gallery");
        }}
      />
      <Button
        title="Go to Posts"
        onPress={() => {
          navigation.navigate("Posts");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
