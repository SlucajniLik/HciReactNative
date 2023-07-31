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


if(isFavoritt)
{


  axios
  .delete(baseUlr+"removeFav",{data:fav})
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
    



    // Perform any additional logic here, like adding/removing from favorites list, etc.
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleToggleFavorite}>
      <Ionicons name={isFavoritt ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'black'} />
      <Text style={styles.buttonText}>{isFavoritt ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    marginLeft: 5,
  },
});

export default AddToFavoritesButton;
