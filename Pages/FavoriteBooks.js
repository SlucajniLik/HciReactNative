
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput,View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";

import Book from "./Book";
import { Text } from "react-native-paper";
function FavoriteBooks  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [bookS, SetBookS] = useState("");
  const [sort, SetSort] = useState("asc");
  const [check, SetCheck] = useState(false);
  const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck}=useContext(UserContext)
 

  const SearchText = () => {
    axios
    .get(baseUlr+"searchBooksFav/"+user?.userId+"/"+bookS)
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })

   
    }

    const SortText = () => {
      axios
      .get(baseUlr+"sortBooksFav/"+user?.userId+"/"+sort)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        if(sort=="asc")
        {SetSort("desc")}
        else if(sort=="desc")
        {
          SetSort("asc")
        }
      })
  

     
      }






        
  








  
 
 
useEffect(()=>{

 
     

axios
.get(baseUlr+"GetFav/"+user?.userId)
.then((response) => {
  console.log(response.data)
 setData(response.data)
})

},[sharedCheck])






  
  return (
    <View style={styles.MainContainer}>
    <View style={styles.header}>
  <TextInput
    placeholder={"Search..."}
    style={styles.input}
    value={bookS}
    onChangeText={(text) => SetBookS(text)}
    onChange={SearchText}



  />
  <Button
    title="Search"
    onPress={SearchText}
  />
</View>
<Button  onPress={SortText}     title={sort}  ></Button>
<Text>Search</Text>



      
      
      
     
      
      <Book  data={data}       navigation={navigation}></Book>
      
    
    </View>
  );
};

const styles={

  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  MainContainer: 
  {
  
 
  backgroundColor: "#1E1B26",
   
  }



}








export default FavoriteBooks