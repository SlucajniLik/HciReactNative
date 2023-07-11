import React, { useState } from 'react';
import { View, Button,Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
//import { imgbbUploader } from "imgbb-uploader"; 
const UploadBook = () => {

  const [image,SetImage]=useState(null)
  const handleImageUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });
  
      if (file.type === 'success') {
        SetImage(file.uri)
        const formData = new FormData();
       
        formData.append('image',{
          name: file.name,
          type: "image/jpeg",
          uri:file.uri // Replace with the appropriate MIME type if needed
        });
        console.log(file.type+"aaa")
        const clientId = "beab1b15c93903d",
        auth = "Client-ID " + clientId;
       const response = await axios.post('https://api.imgur.com/3/image',formData,
      { headers: {
        // Setting header
        Authorization: auth,
        Accept: 'application/json',
        
      }},).then(
        data=>console.log(data)
      ).then(data=>console.log(data));
  


    




        if (response.status === 200) {
          const result = response.data;
          console.log('Upload success:', result);
        } else {
          console.log('Upload failed.');
        }
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