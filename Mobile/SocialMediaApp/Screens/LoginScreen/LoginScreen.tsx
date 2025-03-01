import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import styles from "./LoginScreenStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  {
    Login: undefined;
    Home: undefined;
    Register: undefined;
  },
  "Login"
>;

export type Props = {
  navigation: LoginScreenNavigationProp;
};

const correctLogin = "admin";
const correctPassword = "admin";

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === correctLogin && password === correctPassword) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } else {
      Alert.alert("Invalid credentials", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
