import React, { useState } from 'react';
import { View, Button,Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
//import firebase from 'firebase/app';

//import firebase from "firebase";
//import storage from '@react-native-firebase/storage';

//import { imgbbUploader } from "imgbb-uploader"; 
import {firebase} from '../config';
function UploadBook(){

//const reference = storage().ref('/imagess/t-shirts/black-t-shirt-sm.png');


const uploadFileToFirebase = async (fileUri,filenamee) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const filename =filenamee //fileUri.substring(fileUri.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(`uploads/${filename}`);

    const uploadTask = ref.put(blob);
    const snapshot = await uploadTask;

    const downloadURL = await snapshot.ref.getDownloadURL();

    // Do something with the downloadURL, such as saving it to a database
    console.log('File uploaded successfully:', downloadURL);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};






  const [image,SetImage]=useState(null)
  const handleImageUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });
  
      if (file.type === 'success') {






        SetImage(file.uri)

        uploadFileToFirebase(file.uri,file.name)
      /*  const formData = new FormData();
       
        formData.append('image',{
          uri:file.uri ,
          type:file.mimeType,
          name: file.name,
          
          
    });



    


       /// console.log(file.type+"aaa")
       const clientId = "cd892558bd5eaab",
        auth = "Client-ID " + clientId;
      axios.post('https://api.imgur.com/3/image',formData,
      { headers: {
        // Setting header
        Authorization: auth,
        Accept: 'application/json',
        
      }},).then(
        data=>console.log(data+"//").catch(error=>console.log(error))
      )
  


    
     const result = response.data;

console.log(result+"////////")

        if (response.status === 200) {
          
          console.log('Upload success:', result);
        } else {
          console.log('Upload failed.');
        }

*/














      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {  image!=null? <Image source={{ uri: image }} style={styles.image} />:console.log(image)}
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
};



export default UploadBook;

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