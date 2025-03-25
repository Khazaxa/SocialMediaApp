import React from "react";
import { View, Text, Button } from "react-native";
import { Props } from "../LoginScreen/LoginScreen";
import styles from "../RegisterScreen/RegisterScreenStyles";

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RegisterScreen;
