
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Login from './LogIn';
import Register from './Register';
import BookList from '../Pages/BookList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import axios from 'axios';
import UploadBook from '../Pages/UploadBook';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteBooks from '../Pages/FavoriteBooks';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
import SingleBook from '../Pages/SingleBook';
function Tabs() {

const {SetUser,user,SetUserToken,userToken}=useContext(UserContext)


useEffect(
()=>
{
(
async ()=>{


let token= await AsyncStorage.getItem("token")
let userA= await AsyncStorage.getItem("user")

userA=JSON.parse(userA)
if(userA)
{
console.log(userA.userId+"Navccc")
SetUser(userA)
SetUserToken(token)
axios.defaults.headers.common['Authorization']="Bearer "+token
}







})()







},[])


 
  return (
    <>
    
     { userToken==null ? <Tab.Navigator>
         <Tab.Screen
          name="LogIn"
          component={Login}
          
        />
        <Tab.Screen
          name="Register"
          component={Register}
        />
      </Tab.Navigator>
      :
      <Tab.Navigator>
         <Tab.Screen
          name="BookList"
          component={BookList}
        />
          <Tab.Screen
          name="UploadBooks"
          component={UploadBook}
        />
        
    <Tab.Screen name="Favorites" component={FavoriteBooks}  />
      </Tab.Navigator>}
    
    
</>
    
  )
}

export default Tabs;

