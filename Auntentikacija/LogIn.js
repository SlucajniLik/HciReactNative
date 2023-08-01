
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput,Text,View,TouchableOpacity} from "react-native";
import BookList from "../Pages/BookList";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUlr } from "../config";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
function Login  ({ navigation })  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const {SetUser,user,SetUserToken,userToken}=useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const onPressHandler = () => {


    const user={
        username:username,
        password:password
    }



    axios
    .post(baseUlr+"loginUser",user)
    .then((response) => {
        console.log(response.data.token+"log")
        if(response.data.token!=null)
        {
          AsyncStorage.setItem("token",response.data.token)
          AsyncStorage.setItem("user",JSON.stringify(response.data))
          SetUserToken(response.data.token)
          SetUser(response.data)
          axios.defaults.headers.common['Authorization']="Bearer "+response.data.token
            navigation.navigate('BookList');

           
        }
        else
        {
           setWarning("Unesite ispravne podatke")
        }
        setPassword("")
        setUsername("")
        
    });


    
  }
  return (
    <View  >
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) =>{setUsername(text), setWarning(null)}}
        autoCapitalize={"none"}
      />
      <View  style={styles.inputContainer}  >
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry={!showPassword}
        onChangeText={(text) => {setPassword(text),setWarning(null)}}
      />
       <TouchableOpacity style={styles.toggleButton} onPress={toggleShowPassword}>
        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      </View>
      <Button   onPress={onPressHandler} title={"Ulogujte se"}  />
      {  warning !=null?<Text  style={styles.warning}>{warning}</Text>:""}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  warning: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  toggleButton: {
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default Login