
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput,View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";

import Book from "./Book";
import { Text } from "react-native-paper";
function BookList  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  
  const {SetUser,user,SetUserToken,userToken}=useContext(UserContext)
 
  const LogOut = () => {
    SetUser(null)
    SetUserToken(null)
    AsyncStorage.removeItem("user")
    AsyncStorage.removeItem("token")  
    navigation.navigate('BookList');
      }
 
 
useEffect(()=>{

 
      

axios
.get(baseUlr+"getBooks")
.then((response) => {
  console.log(response.data)
 setData(response.data)
})

},[])






  
  return (
    <>
     
      <Button   onPress={LogOut} title={"Odjavite se "+ (user?.userId)}  />
      <Text>{JSON.stringify(data)}</Text>
      
      <Book  data={data}></Book>
    
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

export default BookList