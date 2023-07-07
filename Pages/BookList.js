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
        if(response!=null)
        {
            navigation.navigate('BookList');
        }
        
    });


    
  }
  return (
    <>
     
      
      <Button   onPress={onPressHandler} title={"Lista knjiga"}  />
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