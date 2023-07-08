
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
function BookList  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const baseUlr="http://lekar1-001-site1.htempurl.com/"
  
 
const user=useContext(UserContext)
useEffect(()=>{

  (async()=>{
    const value = await AsyncStorage.getItem("token");
  
    if (value !== null) {
      console.log("ovdee    "+value+"878")

      
axios
.get(baseUlr+"getBooks",{
  headers: {
    Authorization:"Bearer "+value,
  },
})
.then((response) => {
  console.log(response)
});
    }

  })()
 


  
  
},[])






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
     
      
      <Button   onPress={onPressHandler} title={"Lista knjiga  od "+user.username}  />
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