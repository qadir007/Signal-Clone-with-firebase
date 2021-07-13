import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";

import { db } from "../firebase/firebase";

const AddChatScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const [chatName, setChatName] = useState("");

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName,
      })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chatName}
        onChangeText={setChatName}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button title="Create new Chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
