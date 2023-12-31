import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you've installed and set up Expo and its vector-icons library.
import axios from "axios";
import { baseUlr } from "../config";
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";

const AddToFavoritesButton = ({isFavoritt ,setIsFavoritt,bookIdd,userIdd}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck}=useContext(UserContext)
  var fav={
    userId: userIdd,
    bookId: bookIdd
}
  const handleToggleFavorite = () => {

    var headers;
    headers={
      Authorization: `Bearer ${userToken}`,
      // You can add other headers here if needed
    };
if(isFavoritt)
{


  axios
  .delete(baseUlr+"removeFav",{data:fav},{ headers })
  .then((response) => {
    console.log(response.data+"9999999")
    setIsFavoritt(!isFavoritt)
  })
}
else
{
  axios
  .post(baseUlr+"addFav",fav)
  .then((response) => {
    console.log(response.data+"9999999")
    setIsFavoritt(!isFavoritt)
   
  })
}





SetSharedCheck(!sharedCheck)
    



    
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleToggleFavorite}>
      <Ionicons name={isFavoritt ? 'heart' : 'heart-outline'} size={24} color={isFavoritt  ? 'red' : 'gray'} />
      <Text style={styles.buttonText}>{isFavoritt ? 'Uklonite iz favorita' : 'Dodajte u favorite'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor:"green",
    height: 34
  },
  buttonText: {
    marginLeft: 5,
    color: 'white'
  },
});

export default AddToFavoritesButton;
