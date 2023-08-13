
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
import Tabs from './Tabs';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, TextInput,View } from "react-native";
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
function AppNav() {
  const navigation = useNavigation();
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

const LogOut = () => {
  SetUser(null)
  SetUserToken(null)
  AsyncStorage.removeItem("user")
  AsyncStorage.removeItem("token")  
 // navigation.navigate('BookList');
    }

 
  return (
        
   <>

<Appbar.Header>
 
    <Appbar.Content title="Library" />
    <Appbar.Action icon="magnify" onPress={() => {}} />

    <Appbar.Action icon="heart" onPress={() => {



    navigation.navigate("Favorites")





    }} />
    <Appbar.Action icon="logout" onPress={LogOut} />

  </Appbar.Header>
            <Stack.Navigator  
                screenOptions={{
                    headerShown: false,
                    
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}

                <Stack.Screen name="Home" component={Tabs}    
                 options={{
                  headerTitle: (props) => <LogoTitle {...props} />,
                  headerRight: () => (
                    <Button
                      onPress={() => alert('This is a button!')}
                      title="Info"
                      color="red"
                    />
                  ),
                }}
               />

                {/* Screens */}
                <Stack.Screen name="SingleBook" component={SingleBook} 
                
                
                
                options={{ headerShown: false }} />
            </Stack.Navigator>
       </>
    
  )
}



const styles = 
  {
   
  
   
  };

export default AppNav;

