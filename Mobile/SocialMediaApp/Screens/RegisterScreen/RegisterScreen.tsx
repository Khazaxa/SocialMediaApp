import React, { useState } from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { Props } from "../LoginScreen/LoginScreen";
import styles from "../RegisterScreen/RegisterScreenStyles";

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("https://localhost:7105/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          age,
          password,
          passwordAgain,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "User registered successfully.");
      } else {
        Alert.alert("Registration failed", data.message || "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={email}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={email}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Password again"
        secureTextEntry
        value={password}
        onChangeText={setPasswordAgain}
      />
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
