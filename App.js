/*
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './Auntentikacija/LogIn';
import Register from './Auntentikacija/Register';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: () => null
        // }}
      >
        <Stack.Screen
          name="Login"
          component={LogIn}
        // options={{
        //   header: () => null
        // }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App;
*/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LogIn from './Auntentikacija/LogIn';
import Register from './Auntentikacija/Register';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookList from './Pages/BookList';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
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
          component={LogIn}
          
        />
        <Tab.Screen
          name="Register"
          component={Register}
        />
         <Tab.Screen
          name="BookList"
          component={BookList}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;


/*

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Screen_A"
        drawerPosition='left'
        drawerType="front"
        edgeWidth={100}
        hideStatusBar={false}
        overlayColor='#00000090'
        drawerStyle={{
          backgroundColor: '#e6e6e6',
          width: 250
        }}
        screenOptions={{
          headerShown: true,
          swipeEnabled: true,
          gestureEnabled: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        <Drawer.Screen
          name="Screen_A"
          component={ScreenA}
          options={{
            title: 'Screen_A Title',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="autoprefixer"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999999'}
              />
            )
          }}
        />
        <Drawer.Screen
          name="Screen_B"
          component={ScreenB}
          options={{
            title: 'Screen_B Title',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="btc"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999999'}
              />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;
*/