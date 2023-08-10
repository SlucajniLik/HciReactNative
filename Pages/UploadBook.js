import React, { useState } from 'react';
import { View, Button,Image,Text,TextInput,ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";
import Icon from 'react-native-vector-icons/FontAwesome';
//import firebase from 'firebase/app';

//import firebase from "firebase";
//import storage from '@react-native-firebase/storage';

//import { imgbbUploader } from "imgbb-uploader"; 
import {firebase} from '../config';
function UploadBook(){
  const {SetUser,user,SetUserToken,userToken,sharedCheck,SetSharedCheck,booListCheck,SetBookListCheck}=useContext(UserContext)
//const reference = storage().ref('/imagess/t-shirts/black-t-shirt-sm.png');

const [nameBook,setNameBook]=useState("")
const [pdfBook,setPdfBook]=useState(null)
const [nameImage,setNameImage]=useState(null)
const [nameBook1,setNameBook1]=useState(null)
const [uriBook,setUriBook]=useState(null)
const [uriImage,setUriImage]=useState(null)
const [imageBook,setImageBook]=useState(null)
const [nameWarning,setNameWarning]=useState(null)
const [imageCheck,setImageCheck]=useState(null)
const [bookCheck,setBookCheck]=useState(null)
const [globalWarning,setGlobalWarning]=useState(null)

const [success,setSuccess]=useState(null)

const uploadFileToFirebase = async (fileUri,filenamee,type) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const filename =filenamee //fileUri.substring(fileUri.lastIndexOf('/') + 1);
    var ref;
    if(type=="pdf")
    {
     ref = firebase.storage().ref().child(`books/${filename}`);
     
     
    }
    else if(type=="image")
    {
       ref = firebase.storage().ref().child(`uploads/${filename}`);
      
       
    }
    const uploadTask = ref.put(blob);
    const snapshot = await uploadTask;

    const downloadURL = await snapshot.ref.getDownloadURL();
if(type=="pdf")
{
  setPdfBook(downloadURL)
  setGlobalWarning(false)
}
else(type=="image")
{

  setImageBook(downloadURL)
  setGlobalWarning(false)
  
}
    // Do something with the downloadURL, such as saving it to a database
    console.log('File uploaded successfully:', downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
  const [image,SetImage]=useState(null)
  const handleFileUpload = async (f)=> {

    setSuccess(false)
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: f,
        copyToCacheDirectory: false,
      });
  
      if (file.type === 'success') {

        
console.log(file.mimeType)
          if(file.mimeType!="application/pdf")
          {
            setUriImage(file.uri)
            setNameImage(file.name)
          }
          else
          {
            setUriBook(file.uri)
            setNameBook1(file.name)
          }
       // uploadFileToFirebase(file.uri,file.name)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const UploadBooks= async()=>{



  if(uriImage && uriBook && nameBook)
  {
    const im=await uploadFileToFirebase(uriImage,nameImage,"image")
    const pd=await uploadFileToFirebase(uriBook,nameBook1,"pdf")
    
    
    console.log(im+"/////////")
    console.log(pd+"----------")
    console.log(imageBook+"immmmmmmmmmmmm")
    console.log(pdfBook+"dddddddddddddddddddddddddd")
    
      console.log("ovde sammmmmmmm")
     
      const book={
        id:0,
        userId:user.UserId,
        categoryId:0,
        name:nameBook,
        urlImage:im,
        urlBook:pd,
        likes:0
    
      }
      
      
      
        axios
        .post(baseUlr+"addBook",book)
        .then((response) => {
           console.log(response)
            
        });
      SetBookListCheck(true)
    setSuccess(true)
    setGlobalWarning(false)

  }
else
{
  setGlobalWarning(true)
  setSuccess(false)
}

  

   
    
    
    
    
    
    }









  return (
    <>
    <View   style={styles.container} >
      
    <View style={{alignItems: 'center'}}>
    <Icon
                 name={'eye'}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            

      <Button title="Upload Image" onPress={() =>handleFileUpload('image/*')} />
      <Text    >Slika je obavezna</Text>
      <Button title="Upload book" onPress={() =>handleFileUpload('application/pdf')} />
      <Text>pdf knjiga je obavezna</Text>
      <TextInput
        style={styles.input}
        value={nameBook}
        placeholder={"Ime knjige"}
        
        onChangeText={(text) => 
          
         {
          if(text.length!=0)
          {
setNameWarning(true)
          }
          else
          {
            setNameWarning(false)
            
          }
          setNameBook(text)
         }
        }
        placeholderTextColor='white'
      />
         <ActivityIndicator/>
      { /* nameWarning ==true?<Text  style={styles.warning}>Unesite ime knjige</Text>:""*/}
      {  globalWarning ==true?<Text  style={styles.warning}>Unesite sve podatke</Text>:""}
      {  success ==true?<Text  style={styles.success}>Uspesno ste uneli knigu</Text>:""}
       <Button title="Unesite knjigu" onPress={UploadBooks} />
    </View>
    </>
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
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  warning: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'red',
  },
  success: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'green',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
};