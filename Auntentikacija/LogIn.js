
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import BookList from "../Pages/BookList";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUlr } from "../config";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
function Login  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {SetUser,user,SetUserToken,userToken}=useContext(UserContext)
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
          AsyncStorage.setItem("user",JSON.stringify(response.data))
          SetUserToken(response.data.token)
          SetUser(response.data)
          axios.defaults.headers.common['Authorization']="Bearer "+response.data.token
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