
import React, {  useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import axios from "axios";

function Login  ({ navigation })  {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const baseUlr="http://lekar1-001-site1.htempurl.com/"
  const onPressHandler = () => {
 
  





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
                console.log(response+"reg")
               // navigation.navigate('LogIn');
            });
  }
  return (
    <>
     <TextInput
        style={styles.input}
        value={name}
        placeholder={"Name"}
        onChangeText={(text) => setName(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={surname}
        placeholder={"Surname"}

        onChangeText={(text) => setSurname(text)}
      />
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button   onPress={onPressHandler} title={"Registrujte se"}  />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default Login