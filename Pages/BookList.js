
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput,View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";
function BookList  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [niz, SetNiz] = useState("");
  
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
  console.log(response)
  SetNiz(response)
});
    
},[])






  
  return (
    <>
     
      
      <Button   onPress={LogOut} title={"Lista knjiga  od "+user.userId}  />
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