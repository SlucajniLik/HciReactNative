import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Platform, Pressable } from 'react-native';
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
import { TextInput, Button } from 'react-native-paper';

// Additional imports if needed
function SingleBook({ navigation, route }) {

  const [book, SetBook] = useState({})
  const [comment, SetComment] = useState("")
  const [commentData, SetCommentData] = useState([])
  const [check, SetCheck] = useState(true)
  const [likes, setLikes] = useState(10);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorit, setIsFavorit] = useState(false);
  const [stars, setStars] = useState(1)
  const [average, setAverage] = useState(10)
  const { SetUser, user, SetUserToken, userToken, sharedCheck, SetSharedCheck } = useContext(UserContext)
  useEffect(() => {






    if (route.params?.idBook) {

      axios
        .get(baseUlr + "getComment/" + route.params?.idBook)
        .then((response) => {
          console.log(response.data)
          SetCommentData(response.data)
          console.log(response.data)
        })





      axios
        .get(baseUlr + "getBookById/" + route.params?.idBook)
        .then((response) => {
          console.log(response.data)
          SetBook(response.data)
        })




      axios
        .get(baseUlr + "countLikes/" + route.params?.idBook)
        .then((response) => {
          console.log(response.data + "/////=")
          setLikes(response.data)
        })



      var like = {
        userId: user?.userId,
        bookId: route.params?.idBook
      }
      axios
        .post(baseUlr + "isChecked", like)
        .then((response) => {
          console.log(response.data + "=====")
          setIsLiked(response.data)
        })



      axios
        .get(baseUlr + "getMark/" + user?.userId + "/" + route.params?.idBook)
        .then((response) => {
          console.log(response.data + "zvezda")
          if(response.data!=0)
          {
          setStars(response.data)
          }
          else
          {
            setStars(1)
          }
        })




      var fav = {
        userId: user?.userId,
        bookId: route.params?.idBook
      }

      axios
        .post(baseUlr + "isFavorit", fav)
        .then((response) => {
          console.log(response.data + "=====")
          setIsFavorit(response.data)
        })




    }
  }, [route.params?.idBook, check])



  const WriteComment = async (e) => {

    if (e.nativeEvent.key == "Enter") {
      console.log("Enter je stisnut" + comment)
      let userA = await AsyncStorage.getItem("user")

      userA = JSON.parse(userA)
      const com = {
        bookId: route.params?.idBook,
        userId: userA.userId,
        text: comment,
        datum: new Date()

      }



      axios
        .post(baseUlr + "addComment", com)
        .then((response) => {
          console.log(response.data)
          SetBook(response.data)
          SetCheck(!check)
          SetComment("")
        })
    }
  }





  const downloadBook = async (fileURL, filename) => {


    //console.log("Downloaded file:"+fileURL)
    
    let LocalPath = FileSystem.documentDirectory + filename;
    const result = await FileSystem.downloadAsync(fileURL, LocalPath)
    console.log("Uriiil:" + result.uri)
    //Linking.openURL(result.uri)
    //.then(({uri}) => Linking.openURL(uri));

    save(result.uri, filename, ".pdf");




  };

  const save = async (uri, filename, mimetype) => {

    console.log("Uri:" + uri)
    console.log("Filename:" + filename)
    console.log("Mimetype" + mimetype)



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














 
  const renderItem = (item) => (
    <View style={styles.profileContainer} key={item.id.toString()}  >
      <Text style={styles.userTex}   >@{item.username}



       

      </Text>
      <Text style={styles.comTex}  >{item.text}</Text>
    </View>
  );

  const handleRating = (rating) => {
    
    console.log('Selected Rating:', rating);
  };

  const [selected, setSelected] = useState(false);


  return (

    <ScrollView>

      <View style={styles.contentContainer}>
        <View style={styles.contentRow}>
          <Image source={{ uri: book.urlImage }} style={styles.image} />
          <View style={styles.contentInfo}>
            <Text style={styles.bookName}>{book.name}</Text>
            <LikeButton likeCount={likes} bookIdd={route.params?.idBook} userIdd={user?.userId} isLikedd={isLiked}
              setLikess={setLikes} setIsLikedd={setIsLiked}
            />
            <View style={{flex: 1}}></View>

            <StarRating maxStars={5} starss={stars} setStarss={setStars} onPress={handleRating}
              userIdd={user?.userId} bookIdd={route.params?.idBook}
              average={average} setAverage={setAverage}
            />  
            <View style={styles.ratings}>
              <View style={styles.ratingInfo}>
                <Text>Lajkovi</Text>
                <Text style={styles.ratingNumber}>{likes}</Text>
              </View>
              <View style={styles.ratingInfo}>
                <Text>Ocena</Text>
                <Text style={styles.ratingNumber}>{average}</Text>
              </View>
            </View> 
          </View>
        </View>
        <View style={styles.buttonsRow}>
          <Pressable
            onPressIn={() => setSelected(true)}
            onPressOut={() => setSelected(false)}
   
          style={selected?styles.button2Press :styles.button2}
            onPress={() => downloadBook(book.urlBook.toString(), book.name + ".pdf")}
          >
            <Text style={styles.buttonText2}>{"Skini knjigu"}</Text>
          </Pressable>
          <AddToFavoritesButton isFavoritt={isFavorit} setIsFavoritt={setIsFavorit} userIdd={user?.userId} bookIdd={route.params?.idBook} />
        </View>








      </View>

      <TextInput
        style={styles.input}
        value={comment}
        placeholder={"Dodajte komentar..."}
        onChangeText={(text) => SetComment(text)}
        autoCapitalize={"none"}
        onKeyPress={WriteComment}
        multiline={true}
        underlineColor="transparent"
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

  )
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
    borderRadius: 25,
    height: 200
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "lightgray",
    borderBottomWidth: 3,
    padding: 20,

    marginTop: "auto"
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "green",
    alignSelf: "center",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: 'white',
    width: 150,
  }
  ,
  buttonText: {
    color: "white",
    fontWeight: "600",
    width: 150,
    flex: 1,
  },
  button2: {
    backgroundColor: "green",
    alignSelf: "center",
    marginTop: "auto",
    marginVertical: 10,
    
    paddingHorizontal: 15,
    borderRadius: 5,
    color: 'white',
    height:35,
    width: 150,
    flex:1,
    justifyContent:'center'

  },
  button2Press: {
    backgroundColor: "lightgreen",
    alignSelf: "center",
    marginTop: "auto",
    marginVertical: 10,
    
    paddingHorizontal: 15,
    borderRadius: 5,
    color: 'white',
    height:35,
    width: 150,
    flex:1,
    justifyContent:'center'

  }
  ,
  buttonText2: {
    color: "white",
    
    fontWeight: "600",
    width: 120,
    marginLeft:25
  
  
    
  },
  goBack: {
    backgroundColor: "green",
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  profileContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: "flex-start",
  },
  userBio: {
    fontSize: 16,
    color: '#555',
    marginLeft: 30
  },

  userTex: {
    fontWeight: 'bold',
    alignSelf: "flex-start",
  },
  comTex: {
    // marginLeft:30
  },
  input: {
    // height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    // backgroundColor: 'white',

  },
  bookName: {
    fontSize: 24
  },
  contentRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 6,
    gap: 6,
    alignItems: 'stretch',
    height: 50
  },
  ratings: {
    backgroundColor: 'rgb(231, 224, 236)',
    borderRadius: 6,
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ratingInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  ratingNumber: {
    fontSize: 24,
    alignSelf: 'center',
  },
  contentInfo: {
    display: 'flex',
    flexDirection: 'column'
  }
};


















export default SingleBook;

