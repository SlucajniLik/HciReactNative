
import React, {  useEffect, useState } from "react";
import { Button, StyleSheet, TextInput,View,TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";

import Book from "./Book";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "react-native-paper";

import { FAB } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
function BookList  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [bookS, SetBookS] = useState("");
  const [sort, SetSort] = useState("asc");
  const [sortb,SetSortb]=useState("sort-asc")
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
    <>
    
    <View  >
      
 

<View style={styles.header}>
<Searchbar
      placeholder="Search"
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
      value={bookS}
    />
  
 


</View>
<TouchableOpacity onPress={SortText}    >
<Icon 
        name={sortb}
        
       
        size={30}
      />
  
    </TouchableOpacity>
      <Book  data={data}   navigation={navigation}></Book>
     
    </View>
    <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => {
navigation.navigate("UploadBooks")

    }}
  />
    </>
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
  fab: {
    position: 'absolute',
    margin:32 ,
    right: 0,
    bottom: 0,
    zIndex:99999
  },
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
   
  }, icon: {
    marginRight: 8,
    fontSize: 16
  },
  iconButton: {
    marginRight: 8,
    height:120,
    backgroundColor:"red",
    fontSize: 200
  },



}



export default BookList