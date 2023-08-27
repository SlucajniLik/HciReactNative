
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput,View,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";

import Book from "./Book";
import { Text } from "react-native-paper";
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
function FavoriteBooks  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [bookS, SetBookS] = useState("");
  const [sort, SetSort] = useState("asc");
  const [check, SetCheck] = useState(false);
  const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck}=useContext(UserContext)
  const [sortb,SetSortb]=useState("sort-asc")

  /*const SearchText = () => {
    axios
    .get(baseUlr+"searchBooksFav/"+user?.userId+"/"+bookS)
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })

   
    }*/

    const SortText = () => {
      axios
      .get(baseUlr+"sortBooksFav/"+user?.userId+"/"+sort)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        if(sort=="asc")
        {SetSort("desc")
         SetSortb("sort-desc")
      }
        else if(sort=="desc")
        {
          SetSort("asc")
           SetSortb("sort-asc")
        }
      })
  

     
      }






        
  








  
 
 
useEffect(()=>{

  var headers;
  headers={
    Authorization: `Bearer ${userToken}`,
    // You can add other headers here if needed
  };
     

axios
.get(baseUlr+"GetFav/"+user?.userId,{ headers })
.then((response) => {
  console.log(response.data)
 setData(response.data)
})

},[sharedCheck])






  
  return (
    <>
    <View >
    <View style={styles.header}>
  <Searchbar
    placeholder={"Pretrazite..."}
    style={styles.input}
    value={bookS}
    onChangeText={(text) => {
      if(text!="")
      {
        var headers;
        headers={
          Authorization: `Bearer ${userToken}`,
          // You can add other headers here if needed
        };
      axios
    .get(baseUlr+"searchBooksFav/"+user?.userId+"/"+text,{ headers })
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })
  }
  else{
    
axios
.get(baseUlr+"GetFav/"+user?.userId,{ headers })
.then((response) => {
  console.log(response.data)
 setData(response.data)
})
  }
      
      
      
      SetBookS(text)}}
    //onChange={SearchText}



  />
 <TouchableOpacity onPress={SortText}    >
<Icon 
        name={sortb}
        
       
        size={45}
      />
  
    </TouchableOpacity>
</View>

     
    </View>
     <Book  data={data}       navigation={navigation}></Book>
     </>
  );
};

const styles={

  header: {
    flexDirection: "row",
    alignItems: "center",
    display: 'flex',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    //padding: 10,
    marginVertical: 5,
  },
  MainContainer: 
  {
  
 
  backgroundColor: "#1E1B26",
   
  }



}








export default FavoriteBooks