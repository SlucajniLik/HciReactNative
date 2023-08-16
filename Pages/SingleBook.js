import React, { useState,useEffect } from 'react';
import { View, FlatList ,Text,Image,Button,TextInput,TouchableOpacity,Platform,Pressable} from 'react-native';
import { Link, useRoute } from "@react-navigation/native"
import axios from "axios";
import { Linking } from 'react-native';
import { baseUlr } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage'
import LikeButton from '../Components/LikeButton';
import StarRating from '../Components/StarRating';
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import AddToFavoritesButton from '../Components/AddToFavoritesButton';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';


// Additional imports if needed
function SingleBook({navigation,route})  {
    
const [book,SetBook]=useState({})
const [comment,SetComment]=useState("")
const [commentData,SetCommentData]=useState([])
const[check,SetCheck]=useState(true)
const [likes, setLikes] = useState(10);
const [isLiked, setIsLiked] = useState(false);
const [isFavorit, setIsFavorit] = useState(false);
const [stars,setStars]=useState(0)
const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck}=useContext(UserContext)
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



    axios
    .get(baseUlr+"getMark/"+user?.userId+"/"+route.params?.idBook)
    .then((response) => {
      console.log(response.data+"zvezda")
      setStars(response.data)
    })



   
    var fav={
      userId: user?.userId,
      bookId: route.params?.idBook
    }

    axios
    .post(baseUlr+"isFavorit",fav)
    .then((response) => {
      console.log(response.data+"=====")
      setIsFavorit(response.data)
    })




  }
    },[route.params?.idBook,check])



    const WriteComment =async (e) => {

      if(e.nativeEvent.key == "Enter"){
        console.log("Enter je stisnut"+comment)
        let userA= await AsyncStorage.getItem("user")

userA=JSON.parse(userA)
const com={
  bookId:route.params?.idBook,
  userId:userA.userId,
  text:comment,
  datum:new Date()

}



        axios
        .post(baseUlr+"addComment",com)
        .then((response) => {
          console.log(response.data)
          SetBook(response.data)
          SetCheck(!check)
          SetComment("")
        })
    }
  }





  const downloadBook = async (fileURL,filename) => {


    //console.log("Downloaded file:"+fileURL)
    let LocalPath = FileSystem.documentDirectory +filename;
   const result= await FileSystem.downloadAsync(fileURL, LocalPath)
   console.log("Uriiil:"+result.uri)
   //Linking.openURL(result.uri)
      //.then(({uri}) => Linking.openURL(uri));

      save(result.uri, filename,".pdf");



   
  };

  const save = async (uri, filename, mimetype) => {

console.log("Uri:"+uri)
console.log("Filename:"+filename)
console.log("Mimetype"+mimetype)



    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };



  










   /* async function downloadBook(url) {
      const fileUrl = url;
  
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
    }*/
    const data = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
      // Add more items as needed
    ]; 
    const renderItem = (item) => (
      <View   style={styles.profileContainer}  key={item.id.toString()}  >
        <Text   style={styles.userTex}   >{item.username } 

        {
        Math.floor((new Date()-new Date(item.datum))/ (1000 * 60 * 60 * 24))?
        Math.floor((new Date()-new Date(item.datum))/ (1000 * 60 * 60 * 24))+"days":
        Math.floor((new Date()-new Date(item.datum))/ (1000 * 60 * 60)%24)?
        Math.floor((new Date()-new Date(item.datum))/ (1000 * 60 * 60)%24)+"hours":"sad"
      }
        
      </Text>
        <Text   style={styles.comTex}  >{item.text}</Text>
      </View>
    );

    const handleRating = (rating) => {
      // Handle the selected rating here
      console.log('Selected Rating:', rating);
    };
  return (

<ScrollView>

<View style={styles.contentContainer}>


<Image  source={{uri: book.urlImage}}  style={styles.image}/>
<Text>Naziv knjige:{book.name}</Text>
<Pressable
  style={styles.button}
  onPress={()=>downloadBook(book.urlBook.toString(),book.name+".pdf")} 
>
  <Text style={styles.buttonText}>{"Skini knjigu"}</Text>
</Pressable>



<LikeButton  likeCount={likes} bookIdd={route.params?.idBook} userIdd={user?.userId} isLikedd={isLiked} 
setLikess={setLikes} setIsLikedd={setIsLiked}
/>
<StarRating maxStars={5} starss={stars} setStarss={setStars}    onPress={handleRating}
userIdd={user?.userId} bookIdd={route.params?.idBook}
/>
<AddToFavoritesButton     isFavoritt={isFavorit} setIsFavoritt={setIsFavorit}  userIdd={user?.userId} bookIdd={route.params?.idBook} />


</View>
<KeyboardAvoidingView></KeyboardAvoidingView>
<TextInput
        style={styles.input}
        value={comment}
        placeholder={"Add comment"}
        onChangeText={(text) => SetComment(text)}
        autoCapitalize={"none"}
        onKeyPress={WriteComment}
        multiline={true}
      />





<View style={styles.container}>

  {commentData.map(renderItem)}
      {/* <FlatList
        data={commentData
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
        </ScrollView>















    
   /*<>         
    <View style={styles.wrapper}>
      
           <Image  source={{uri: book.urlImage}}  style={styles.image}/>
         
          <Text>{book.name}</Text>
    
 
<Button   onPress={()=>downloadBook(book.urlBook.toString(),book.name+".pdf")}  title={"Skini knjigu"} ></Button>
<LikeButton  likeCount={likes} bookIdd={route.params?.idBook} userIdd={user?.userId} isLikedd={isLiked} 
setLikess={setLikes} setIsLikedd={setIsLiked}
/>
<StarRating maxStars={5} starss={stars} setStarss={setStars}    onPress={handleRating}
userIdd={user?.userId} bookIdd={route.params?.idBook}
/>
<AddToFavoritesButton     isFavoritt={isFavorit} setIsFavoritt={setIsFavorit}  userIdd={user?.userId} bookIdd={route.params?.idBook} />

<Button onPress={() => navigation.goBack()} title='Vrati se nazad'></Button>
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

   </>   */
        )}
    

        const styles = {
          container: {
            display:"flex",
            flexDirection: "column",
            gap: 20,
            marginVertical: 10,
            paddingHorizontal: 20
          },
          image: {
            flex: 1,
            aspectRatio: 2 / 3,
            marginRight: 10,
            borderRadius:25,
            height:200
          },
          contentContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent:"space-around",
            alignItems:"center",
            borderColor: "lightgray",
            borderBottomWidth: 3,
         
            marginTop:"auto"
          },
          title: {
            fontSize: 16,
            fontWeight: "500",
          },
          button:{
        backgroundColor:"green",
        alignSelf:"center",
        marginTop:"auto",
        marginVertical:10,
        padding:7,
        paddingHorizontal:15,
        borderRadius:5
          }
          ,
          buttonText:{
          color:"white",
          fontWeight:"600"
          },
          goBack:{
            backgroundColor:"green",
            alignSelf:"flex-start",
            marginTop:"auto",
            marginVertical:10,
            padding:7,
            paddingHorizontal:15,
            borderRadius:5
              },
              profileContainer: {
                padding: 20,
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                
              },
              username: {
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf:"flex-start",
              },
              userBio: {
                fontSize: 16,
                color: '#555',
                marginLeft:30
              },
              
              userTex:{
                fontWeight: 'bold',
                alignSelf:"flex-start",
              },
              comTex:{
                marginLeft:30
              },
              input: {
                height: 40,
                marginBottom: 10,
                backgroundColor: 'white',
              },
        };
        












   
     
          
        

export default SingleBook;

/*const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: "white",
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
};*/