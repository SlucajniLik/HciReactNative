
import React, {  useState } from "react";
import { Button, StyleSheet,Text,View,TouchableOpacity,Image,ActivityIndicator,Pressable} from "react-native";
import axios from "axios";
import { baseUlr } from "../config";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
function Register ({ navigation })  {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [nameWarning, setNameWarning] = useState(null);
  const [nameWarning2, setNameWarning2] = useState(null);
  const [surnNameWarning, setSurNameWarning] = useState(null);
  const [surnNameWarning2, setSurNameWarning2] = useState(null);
  const [usernameWarning, setUsernameWarning] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(null);
  const [globalWarning, setGlobalWarning] = useState(null);
  const [alredyExist, setAlredyExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [success,setSuccess]=useState(null)
  const [uploadd,setUploadd]=useState(false)
  //const baseUlr="http://lekar1-001-site1.htempurl.com/"
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const onPressHandler = () => {
 
  


if(nameWarning==false && surnNameWarning==false  &&
  nameWarning2==false && surnNameWarning2==false 
  && usernameWarning==false && passwordWarning==false && confirmPasswordWarning==false)
{
  setUploadd(true)

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
                setUploadd(false)
               }
               else
               {
                  
                   setSuccess(true)  
                   setUploadd(false)

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
    


      <View style={styles.container}>
        


        <View style={{alignItems: 'center'}}>
    <Image source={require('../assets/library-icon.png')} style={styles.image} />
            </View>
     
        <TextInput
           style={styles.input}
           value={name}
           placeholder={"Ime"}
           onChangeText={(text) => {
           



            if(text.charAt(0)!=text.charAt(0).toUpperCase())
            {
             setNameWarning2(true)
            }
            else
            {
              setNameWarning2(false)
            }
          


             if(text.length<3)
             {
               setNameWarning(true)
               
             }
             else
             {
               setNameWarning(false)
             }
             
             setName(text)
             setSuccess(false)
             setGlobalWarning(false)
             setAlredyExist(false)
             }}
           autoCapitalize={"none"}
          placeholderTextColor='white'
            underlineColor="transparent"
         
        />
          {  nameWarning ==true?<Text  style={styles.warning}>Ime mora imati najmanje tri slova</Text>:<View/>}
          {  nameWarning2 ==true?<Text  style={styles.warning}>Ime mora pocinjati velikim slovom</Text>:<View/>}

        <TextInput
        style={styles.input}
        value={surname}
        placeholder={"Prezime"}

        onChangeText={(text) =>{
          if(text.length<3)
          {
            setSurNameWarning(true)
            
          }
          else
          {
            setSurNameWarning(false)
          }
          
          if(text.charAt(0)!=text.charAt(0).toUpperCase())
            {
             setSurNameWarning2(true)
            }
            else
            {
              setSurNameWarning2(false)
            }

          setSurname(text)
          setSuccess(false)
          setGlobalWarning(false)
          setAlredyExist(false)
        }}
         placeholderTextColor='white'
            underlineColor="transparent"
        />
         {  surnNameWarning ==true?<Text  style={styles.warning}>Prezime mora imati najmanje tri slova</Text>:<View/>}
         {  surnNameWarning2 ==true?<Text  style={styles.warning}>Prezime mora pocinjati velikim slovom</Text>:<View/>}
        <TextInput
         style={styles.input}
         value={username}
         placeholder={"Korisnicko ime"}
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
           setSuccess(false)
           setGlobalWarning(false)
           setAlredyExist(false)
         }}
         autoCapitalize={"none"}
         placeholderTextColor='white'
           underlineColor="transparent"
        />
        {  usernameWarning ==true?<Text  style={styles.warning}>Korisnicko ime mora imati najmanje tri slova</Text>:<View/>}
        <View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Lozinka"}
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
            setSuccess(false)
            setGlobalWarning(false)
            setAlredyExist(false)
            setPassword(text)}}
            placeholderTextColor='white'
              underlineColor="transparent"
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
         {  passwordWarning ==true?<Text  style={styles.warning}>Lozinka mora imati makar tri karaktera</Text>:<View/>}
         <View>
         <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder={"Potvrdite lozinku"}
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
          placeholderTextColor='white'
            underlineColor="transparent"
      />
      <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={toggleShowPassword2}>
                    <Icon
          name={showPassword2  ? 'eye-slash' : 'eye'}
          size={24}
          color="black"
        />
                </TouchableOpacity>
                </View>
       {  confirmPasswordWarning ==true?<Text  style={styles.warning}>Lozinke se moraju podudarati</Text>:<View/>}
      

     { uploadd==true?<ActivityIndicator/>:<Text></Text>}

       
           <Pressable
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={styles.buttonText}>{"Registrujte se"}</Text>
        </Pressable>
 {  globalWarning ==true?<Text  style={styles.warning}>Unesite ispravno podatke</Text>:<View/>}
      {  alredyExist ==true?<Text  style={styles.warning}>Kornisnik sa ovim korisnickim imenom vec postoji</Text>:<View/>}

      {  success ==true?<Text  style={styles.success}>Uspesno ste se registrovali</Text>:<View/>}
      </View>























  
  );
};




const styles = StyleSheet.create({
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
    backgroundColor: "white",
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
imgBtn:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
success: {
  height: 40,
  marginBottom: 10,
  color: 'green',
},
image:
  {
height:200,
width:200
  },
  button: {
    width: 150,
    backgroundColor: "green",
    marginBottom: 18,
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
  success: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'green',
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

export default Register