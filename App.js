
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LogIn from './Auntentikacija/LogIn';
import Register from './Auntentikacija/Register';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookList from './Pages/BookList';
import AppNav from './Auntentikacija/appNav';
import { UserContext } from './Auntentikacija/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const baseUlr="http://lekar1-001-site1.htempurl.com/"
const [user,SetUser]=useState("")


useEffect(
()=>
{

(async ()=>
{


const value=await AsyncStorage.getItem("token")

if(value!==null)
{
//axios.defaults.headers.common['Authorization']="Bearer "+value


//console.log("ovdee    "+value+"   //")



  axios
    .get(baseUlr+"getInformation",{
      headers: {
        Authorization:"Bearer "+value,
      },
    })
    .then((response) => {
        SetUser(response.data)
       
        
    });
}
})()








},[])






  return (
 <UserContext.Provider value={user}>
<AppNav/>
 </UserContext.Provider>

 
      
    
   
  )
}

export default App;

