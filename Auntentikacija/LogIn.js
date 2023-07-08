/*import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
*/

 /*export default function Login({ navigation }) {

    const onPressHandler = () => {
      navigation.navigate('Register');
    }
  
    return (
      <View style={styles.body}>
        <Text style={styles.text}>
          LogIn
        </Text>
        <Pressable
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
        >
          <Text style={styles.text}>
            Register
          </Text>
        </Pressable>
      </View>
    )
  }

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
      margin: 10,
    }
  })
*/
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import BookList from "../Pages/BookList";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
function Login  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseUlr="http://lekar1-001-site1.htempurl.com/"
  const onPressHandler = () => {


    const user={
        username:username,
        password:password
    }



    axios
    .post(baseUlr+"loginUser",user)
    .then((response) => {
        console.log(response.data.token+"log")
        if(response.data.token!=null)
        {
          AsyncStorage.setItem("token",response.data.token)
            navigation.navigate('BookList');

           
        }
        
    });


    
  }
  return (
    <>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button   onPress={onPressHandler} title={"Ulogujte se"}  />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default Login