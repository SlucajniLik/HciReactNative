
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Login from './LogIn';
import Register from './Register';
import BookList from '../Pages/BookList';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function AppNav() {


  const LogOut = () => {



AsyncStorage.removeItem("token")
    
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
      // //  screenOptions={({ route }) => ({
      //     // tabBarIcon: ({ focused, size, color }) => {
      //       let iconName;
      //       if (route.name === 'LogIn') {
      //         iconName = 'autoprefixer';
      //         size = focused ? 25 : 20;
      //         // color = focused ? '#f0f' : '#555';
      //       } else if (route.name === 'Register') {
      //         iconName = 'btc';
      //         size = focused ? 25 : 20;
      //         // color = focused ? '#f0f' : '#555';
      //       }
      //       return (
      //         <FontAwesome5
      //           name={iconName}
      //           size={size}
      //           color={color}
      //         />
      //       )
      //     }
      //   })}
      //   tabBarOptions={{
      //     activeTintColor: '#f0f',
      //     inactiveTintColor: '#555',
      //     activeBackgroundColor: '#fff',
      //     inactiveBackgroundColor: '#999',
      //     showLabel: true,
      //     labelStyle: { fontSize: 14 },
      //     showIcon: true,
      //   }}
      //   activeColor='#f0edf6'
      //   inactiveColor='#3e2465'
      //   barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="LogIn"
          component={Login}
          
        />
        <Tab.Screen
          name="Register"
          component={Register}
        />
         <Tab.Screen
          name="BookList"
          component={BookList}
        />
         <Tab.Screen
          name="Odjavi se"
          component={LogOut}
        />
   
      </Tab.Navigator>
      
    </NavigationContainer>
  )
}

export default AppNav;

