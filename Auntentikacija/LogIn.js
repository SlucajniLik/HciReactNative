
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput,Text,View,TouchableOpacity,Image} from "react-native";
import BookList from "../Pages/BookList";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUlr } from "../config";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
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
           

           
        }
        else
        {
           setWarning("Unesite ispravne podatke")
        }
        setPassword("")
        setUsername("")
        
    });


    
  }




    const onPressHandler2 = () => {

      navigation.navigate("Registrujte se")




    }
      
      
      return (
    <>



    <View style={styles.container}>
    <View style={{alignItems: 'center'}}>
              <Icon
                 name={'eye'}
                style={{
                  width: '80%',
                  height: 100,
                  
                  margin: 30,
                }}
              />
            </View>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"Korisnicko ime"}
          onChangeText={(text) =>{setUsername(text), setWarning(null)}}
          autoCapitalize="none"
          placeholderTextColor='white'
         
        />
        <View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Lozinka"}
          secureTextEntry={!showPassword}
          onChangeText={(text) => {setPassword(text),setWarning(null)}}
          autoCapitalize="none"
          placeholderTextColor='white'          
        />
        
         <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={toggleShowPassword}>
                    <Icon
          name={showPassword  ? 'eye-slash' : 'eye'}
          size={24}
          color="black"
        />
                 
                </TouchableOpacity>
                </View>
                
       
        <Button
           onPress={onPressHandler} title={"Ulogujte se"} 
          />
          {  warning !=null?<Text  style={styles.warning}>{warning}</Text>:<View/>}
          <View style={styles.imgBtn}>
          <Button
           onPress={onPressHandler2} title={"Registrujte se"} 
           
          />
          </View>
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
visibilityBtn: {
    position: 'absolute',
    right: 14,
    height: 25,
    width: 25,
    padding: 0,
    marginTop: 25,
  },
  warning: {
    height: 40,
    marginBottom: 10,
    color: 'red',
  },
imgBtn:{
  backgroundColor:"green",
marginTop:10,
  justifyContent: 'center',
  alignItems: 'center'
},

})








/*const styles = StyleSheet.create({
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
});*/

export default Login