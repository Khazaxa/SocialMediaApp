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
import styles from "./LoginScreenStyles";

const VALID_EMAIL = "user";
const VALID_PASSWORD = "123";

type LoginScreenNavigationProp = StackNavigationProp<
  {
    Login: undefined;
    Register: undefined;
    Home: undefined;
  },
  "Login"
>;

export type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
