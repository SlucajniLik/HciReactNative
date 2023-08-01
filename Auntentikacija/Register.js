
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput,Text,View,TouchableOpacity} from "react-native";
import axios from "axios";
import { baseUlr } from "../config";
function Register ({ navigation })  {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [nameWarning, setNameWarning] = useState(null);
  const [surnNameWarning, setSurNameWarning] = useState(null);
  const [usernameWarning, setUsernameWarning] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(null);
  const [globalWarning, setGlobalWarning] = useState(null);
  const [alredyExist, setAlredyExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  //const baseUlr="http://lekar1-001-site1.htempurl.com/"
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const onPressHandler = () => {
 
  


if(nameWarning==false && surnNameWarning==false && usernameWarning==false && passwordWarning==false && confirmPasswordWarning==false)
{

  const user={

    name:name,
    surname:surname,
    username:username,
    password:password
}



console.log(user)


    axios
            .post(baseUlr+"registerUser",user)
            .then((response) => {

                console.log(response.data+"*////")

               if(response.data=="")
               {
                setAlredyExist(true)
               }
               // navigation.navigate('LogIn');
            });
}
else
{
setGlobalWarning(true)
}

  }
  return (
    <>
     <TextInput
        style={styles.input}
        value={name}
        placeholder={"Name"}
        onChangeText={(text) => {
        
          if(text.length<3)
          {
            setNameWarning(true)
            
          }
          else
          {
            setNameWarning(false)
          }
          setName(text)
          setGlobalWarning(false)
          setAlredyExist(false)
          }}
        autoCapitalize={"none"}
      />
      {  nameWarning ==true?<Text  style={styles.warning}>Ime mora imati najmanje tri slova</Text>:""}
      <TextInput
        style={styles.input}
        value={surname}
        placeholder={"Surname"}

        onChangeText={(text) =>{
          if(text.length<3)
          {
            setSurNameWarning(true)
            
          }
          else
          {
            setSurNameWarning(false)
          }
          

          setSurname(text)
          setGlobalWarning(false)
          setAlredyExist(false)
        }}
      />
      {  surnNameWarning ==true?<Text  style={styles.warning}>Prezime mora imati najmanje tri slova</Text>:""}
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => {
          if(text.length<3)
          {
            setUsernameWarning(true)
            
          }
          else
          {
            setUsernameWarning(false)
          }
          
          setUsername(text)
          setGlobalWarning(false)
          setAlredyExist(false)
        }}
        autoCapitalize={"none"}
      />
     
      {  usernameWarning ==true?<Text  style={styles.warning}>Korisnicko ime mora imati najmanje tri slova</Text>:""}
      <View style={styles.inputContainer} >
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry={!showPassword}
        onChangeText={(text) =>{
          if(text.length<3)
          {
            setPasswordWarning(true)
            
          }
          else
          {
            setPasswordWarning(false)
          }
        
          setGlobalWarning(false)
          setAlredyExist(false)
          setPassword(text)}}
      />
      <TouchableOpacity style={styles.toggleButton} onPress={toggleShowPassword}>
        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      </View>
      {  passwordWarning ==true?<Text  style={styles.warning}>Lozinka mora imati makar tri karaktera</Text>:""}
      <View style={styles.inputContainer} >
      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder={"Confirm password"}
        secureTextEntry={!showPassword2}
        onChangeText={(text) => {
          if(text!=password)
          {
            setConfirmPasswordWarning(true)
            
          }
          else
          {
            setConfirmPasswordWarning(false)
          }
          setGlobalWarning(false)
          setAlredyExist(false)
          setConfirmPassword(text)}}
      />
      <TouchableOpacity style={styles.toggleButton} onPress={toggleShowPassword2}>
        <Text>{showPassword2 ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      </View>
      {  confirmPasswordWarning ==true?<Text  style={styles.warning}>Lozinke se moraju podudarati</Text>:""}
      <Button   onPress={onPressHandler} title={"Registrujte se"}  />
      {  globalWarning ==true?<Text  style={styles.warning}>Unesite ispravno podatke</Text>:""}
      {  alredyExist ==true?<Text  style={styles.warning}>Kornisnik sa ovim korisnickim imenom vec postoji</Text>:""}
    </>
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

export default Register