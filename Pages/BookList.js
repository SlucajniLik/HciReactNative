
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
  const [bookS, SetBookS] = useState("");
  const [sort, SetSort] = useState("asc");
  const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck,booListCheck,SetBookListCheck}=useContext(UserContext)
 

  /*const SearchText = () => {
    axios
    .get(baseUlr+"searchBooks/"+bookS)
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })

   
    }*/

    const SortText = () => {
      axios
      .get(baseUlr+"sortBooks/"+sort)
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






  const onPressHandler = () => {


   
         
            navigation.navigate('SingleBook',{ idBook: 5 });

           
        }
        
  








  const LogOut = () => {
    SetUser(null)
    SetUserToken(null)
    AsyncStorage.removeItem("user")
    AsyncStorage.removeItem("token")  
   // navigation.navigate('BookList');
      }
 
 
useEffect(()=>{

 
      

axios
.get(baseUlr+"getBooks")
.then((response) => {
  console.log(response.data)
 setData(response.data)
})

},[booListCheck])






  
  return (
    <View  >
<View style={styles.header}>
  <TextInput
    placeholder={"Search..."}
    style={styles.input}
    value={bookS}
    onChangeText={(text) => {
      
      
     if(text!="")
     {
      axios
      .get(baseUlr+"searchBooks/"+text)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
    }
    else
    {

      
axios
.get(baseUlr+"getBooks")
.then((response) => {
  console.log(response.data)
 setData(response.data)
})
    }




     
      SetBookS(text)
     
  }}
    //onChange={SearchText}



  />
 <Button  onPress={SortText}     title={sort}  ></Button>
</View>
      <Button   onPress={LogOut} title={"Odjavite se "+ (user?.userId)}  />
      <Book  data={data}   navigation={navigation}></Book>
    </View>
  );
};

/*const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});*/


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



export default BookList