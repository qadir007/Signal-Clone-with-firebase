import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Platform } from "react-native";
import { Button, Image, Input } from "react-native-elements";

import { auth } from "../firebase/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS = "ios" ? "padding" : "height")}
      style={styles.contaienr}
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContaienr}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={login}
        />
      </View>
      <Button containerStyle={styles.button} onPress={login} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContaienr: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default LoginScreen;
