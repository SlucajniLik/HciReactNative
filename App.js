
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LogIn from './Auntentikacija/LogIn';
import Register from './Auntentikacija/Register';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookList from './Pages/BookList';
import AppNav from './Auntentikacija/AppNav';
import { UserContext } from './Auntentikacija/UserContext';

import axios from 'axios';
import { baseUlr } from './config';
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {

const [user,SetUser]=useState(null)
const [userToken,SetUserToken]=useState(null)






  return (
 <UserContext.Provider value={{SetUser,user,SetUserToken,userToken}}>
<AppNav/>
 </UserContext.Provider>

 
      
    
   
  )
}

export default App;

