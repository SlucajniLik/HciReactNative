import React, { useState,useEffect } from 'react';
import { View, FlatList ,Text,Image,Button} from 'react-native';
import { Link, useRoute } from "@react-navigation/native"
import axios from "axios";
import { Linking } from 'react-native';
import { baseUlr } from "../config";
import * as FileSystem from 'expo-file-system';
// Additional imports if needed
function SingleBook({route})  {
    
const [book,SetBook]=useState({})

  useEffect(()=>{

 
      console.log(route.params?.idBook+"******----****")
if(route.params?.idBook)
{
    axios
    .get(baseUlr+"getBookById/"+route.params?.idBook)
    .then((response) => {
      console.log(response.data)
      SetBook(response.data)
    })
  }
    },[route.params?.idBook])



    async function downloadBook(url) {
      const fileUrl = baseUlr + url; // Modify this if needed
    
      try {
        const downloadDest = `${FileSystem.documentDirectory}book.pdf`; // Modify the file name and extension if needed
    
        const { uri } = await FileSystem.downloadAsync(fileUrl, downloadDest);
        console.log('Download complete:', uri);
    
        // Handle download success
        // You can perform any additional operations here, such as opening the downloaded book
      } catch (error) {
        console.log('Download error:', error);
        // Handle download error
      }
    }
    


    
  return (
   <>
    
    <View style={styles.wrapper}>
      
           <Image  source={{uri: book.urlImage}}  style={styles.image}/>
         
          <Text>{book.name}</Text>
    
         
     
<Text onPress={() => Linking.openURL(book.urlBook)}>
    {book.urlBook}
</Text>

        </View>



   </>   
        )}
    



   
     
          
        

export default SingleBook;

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
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
};