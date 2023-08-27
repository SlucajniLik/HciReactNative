import React, { useState,useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you want to use the FontAwesome heart icon
import axios from "axios";
import { baseUlr } from "../config";

const LikeButton = ({likeCount,bookIdd,userIdd,isLikedd,setLikess,setIsLikedd}) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);



  useEffect(()=>{
   setLikes(likeCount)
   console.log(likeCount+"9999")
    },[])
    





var like={
    userId: userIdd,
    bookId: bookIdd
}


  const handleLike = () => {
    if (isLikedd) {
        axios
        .delete(baseUlr+"removeLikes",{data:like})
        .then((response) => {
          console.log(response.data+"9999999")
          setLikess(likeCount - 1);
        })
     
    } else {





        axios
        .post(baseUlr+"addLikes",like)
        .then((response) => {
          console.log(response.data+"88888")
          setLikess(likeCount + 1);
        })


    
    }
    setIsLikedd(!isLikedd);
  };

  return (
    <TouchableOpacity onPress={handleLike} style={styles.container}>
      <Icon
        name={isLikedd? 'heart' : 'heart-o'}
        size={24}
        color={isLikedd? 'red' : 'black'}
        style={styles.icon}
      />
      {/* <Text style={styles.text}>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default LikeButton;

