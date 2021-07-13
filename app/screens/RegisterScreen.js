import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Platform } from "react-native";
import { Button, Image, Input, Text } from "react-native-elements";

import { auth } from "../firebase/firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoUrl:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS = "ios" ? "padding" : "height")}
      style={styles.contaienr}
    >
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create an Afchat Account
      </Text>
      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContaienr}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
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
        />
        <Input
          placeholder="Profile picture Url (optional)"
          type="email"
          value={imageUrl}
          onChangeText={setImageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={register}
        title="Register"
      />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Login")}
        type="outline"
        title="Login"
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

export default RegisterScreen;
