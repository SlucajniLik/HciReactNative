import React, { useState,useEffect } from 'react';
import { View, FlatList ,Text,Image,Button,TextInput} from 'react-native';
import { Link, useRoute } from "@react-navigation/native"
import axios from "axios";
import { Linking } from 'react-native';
import { baseUlr } from "../config";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LikeButton from '../Components/LikeButton';
import StarRating from '../Components/StarRating';
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
// Additional imports if needed
function SingleBook({route})  {
    
const [book,SetBook]=useState({})
const [comment,SetComment]=useState("")
const [commentData,SetCommentData]=useState([])
const[check,SetCheck]=useState(true)
const [likes, setLikes] = useState(10);
const [isLiked, setIsLiked] = useState(false);
const {SetUser,user,SetUserToken,userToken}=useContext(UserContext)
  useEffect(()=>{

   


   
      
if(route.params?.idBook)
{

  axios
  .get(baseUlr+"getComment/"+route.params?.idBook)
  .then((response) => {
    console.log(response.data)
    SetCommentData(response.data)
    console.log(response.data)
  })





    axios
    .get(baseUlr+"getBookById/"+route.params?.idBook)
    .then((response) => {
      console.log(response.data)
      SetBook(response.data)
    })




    axios
    .get(baseUlr+"countLikes/"+route.params?.idBook)
    .then((response) => {
      console.log(response.data+"/////=")
      setLikes(response.data)
    })


    
var like={
  userId: user?.userId,
  bookId: route.params?.idBook
}
    axios
    .post(baseUlr+"isChecked",like)
    .then((response) => {
      console.log(response.data+"=====")
      setIsLiked(response.data)
    })


  }
    },[route.params?.idBook,check])



    const WriteComment =async (e) => {

      if(e.nativeEvent.key == "t"){
        console.log("Enter je stisnut"+comment)
        let userA= await AsyncStorage.getItem("user")

userA=JSON.parse(userA)
const com={
  bookId:route.params?.idBook,
  userId:userA.userId,
  text:comment

}



        axios
        .post(baseUlr+"addComment",com)
        .then((response) => {
          console.log(response.data)
          SetBook(response.data)
          SetCheck(!check)
        })




    }
   
         
      

     
  }
    async function downloadBook(url) {
      const fileUrl = baseUlr + url;
  
      try {
        const downloadDest = `${FileSystem.documentDirectory}book.pdf`;
  
        const response = await fetch(fileUrl);
        const fileContents = await response.text();
  
        await FileSystem.writeAsStringAsync(downloadDest, fileContents, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        console.log('Download complete:', downloadDest);
  
        // Handle download success
        // You can perform any additional operations here, such as opening the downloaded book
      } catch (error) {
        console.log('Download error:', error);
        // Handle download error
      }
    }
    const data = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
      // Add more items as needed
    ]; 
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text>{item.username}</Text>
        <Text>{item.text}</Text>
      </View>
    );

    const handleRating = (rating) => {
      // Handle the selected rating here
      console.log('Selected Rating:', rating);
    };
  return (
   <>
    
    <View style={styles.wrapper}>
      
           <Image  source={{uri: book.urlImage}}  style={styles.image}/>
         
          <Text>{book.name}</Text>
    
 
<Button   onPress={()=>downloadBook(book.urlBook)}  title={"Skini knjigu"} ></Button>
<LikeButton  likeCount={likes} bookIdd={route.params?.idBook} userIdd={user?.userId} isLikedd={isLiked} 
setLikess={setLikes} setIsLikedd={setIsLiked}
/>
<StarRating maxStars={5} initialRating={3} onPress={handleRating} />
        </View>
       


    
        <Text onPress={() => Linking.openURL(book.urlBook)}>
    {book.urlBook}
</Text>

<TextInput
        style={styles.input}
        value={comment}
        placeholder={"Add comment"}
        onChangeText={(text) => SetComment(text)}
        autoCapitalize={"none"}
        onKeyPress={WriteComment}
      />





<View style={styles.container}>
      <FlatList
        data={commentData
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>

   </>   
        )}
    



   
     
          
        

export default SingleBook;

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
};