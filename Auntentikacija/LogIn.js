
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import BookList from "../Pages/BookList";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUlr } from "../config";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';
function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const { SetUser, user, SetUserToken, userToken } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPressHandler = () => {


    const user = {
      username: username,
      password: password
    }



    axios
      .post(baseUlr + "loginUser", user)
      .then((response) => {
        console.log(response.data.token + "log")
        if (response.data.token != null) {
          AsyncStorage.setItem("token", response.data.token)
          AsyncStorage.setItem("user", JSON.stringify(response.data))
          SetUserToken(response.data.token)
          SetUser(response.data)
          axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token



        }
        else {
          setWarning("Unesite ispravne podatke")
        }
        setPassword("")
        setUsername("")

      });



  }




  const onPressHandler2 = () => {
    setWarning(null)
    navigation.navigate("Registrujte se")




  }


  return (
    <>



      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/library-icon.png')} style={styles.image} />
        </View>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"Korisnicko ime"}
          onChangeText={(text) => { setUsername(text), setWarning(null) }}
          autoCapitalize="none"
          underlineColor="transparent"


        />
        <View>
          <TextInput
            style={styles.input}
            value={password}
            placeholder={"Lozinka"}
            secureTextEntry={!showPassword}
            onChangeText={(text) => { setPassword(text), setWarning(null) }}
            autoCapitalize="none"
            underlineColor="transparent"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={toggleShowPassword}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={24}
              color="black"
            />

          </TouchableOpacity>
        </View>


        <Pressable
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={styles.buttonText}>{"Ulogujte se"}</Text>
        </Pressable>
        
        {warning != null ? <Text style={styles.warning}>{warning}</Text> : <View />}
        <Pressable
          style={styles.button}
          onPress={onPressHandler2}
        >
          <Text style={styles.buttonText}>{"Registrujte se"}</Text>
        </Pressable>
        
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  image:
  {
    height: 200,
    width: 200
  },
  input: {
    width: 350,
    height: 55,

    margin: 10,
    padding: 8,


    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "whitesmoke",
  },
  visibilityBtn: {
    position: 'absolute',
    right: 24,
    height: 25,
    width: 25,
    padding: 0,
    marginTop: 32,
  },
  warning: {
    height: 40,
    marginBottom: 10,
    color: 'red',
  },
  imgBtn: {
    backgroundColor: "green",
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    backgroundColor: "green",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
  }
  ,
  buttonText: {
    color:"white",
  fontWeight:"600",
  alignSelf:"center"
  }
})








export default Login