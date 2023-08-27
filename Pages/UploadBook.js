import React, { useState } from 'react';
import { View, Button,Image,Text,ActivityIndicator,Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { UserContext } from "../Auntentikacija/UserContext";
import { useContext } from "react";
import { baseUlr } from "../config";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
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
const [succesImage,setSuccesImage]=useState(null)
const [succesPdf,setSuccesPdf]=useState(null)
const [uploadd,setUploadd]=useState(false)
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
            setSuccesImage(true)
          }
          else
          {
            setUriBook(file.uri)
            setNameBook1(file.name)
            setSuccesPdf(true)
          }
       // uploadFileToFirebase(file.uri,file.name)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const UploadBooks= async()=>{



  if(uriImage && uriBook && nameBook && nameWarning==false)
  {
    setUploadd(true)
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
      
      var headers;
      headers={
        Authorization: `Bearer ${userToken}`,
        // You can add other headers here if needed
      };
        axios
        .post(baseUlr+"addBook",book,{ headers })
        .then((response) => {
          setUploadd(false)
           console.log(response)
            
        });
      SetBookListCheck(!booListCheck)
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
    
    <View   style={styles.container} >


<View style={{alignItems: 'center'}}>
    <Image source={require('../assets/library-icon.png')} style={styles.image} />
            </View>

      
      
   
      
      <Pressable
          style={styles.button}
          onPress={() =>handleFileUpload('image/*')}
        >
          <Text style={styles.buttonText}>{"Unesite sliku"}</Text>
        </Pressable>







      {  succesImage ==true?<Text  style={styles.success}>Uspesno ste izabrali sliku</Text>:<View/>}
      <Text    >Slika je obavezna</Text>
      <Pressable
          style={styles.button}
          onPress={() =>handleFileUpload('application/pdf')} 
        >
          <Text style={styles.buttonText}>{"Unesite pdf"}</Text>
        </Pressable>




      {  succesPdf ==true?<Text  style={styles.success}>Uspesno ste izabrali pdf</Text>:<View/>}
      <Text>pdf knjiga je obavezna</Text>
      
      <TextInput
        style={styles.input}
        value={nameBook}
        placeholder={"Ime knjige"}
        
        onChangeText={(text) => 
          
         {

          if(text.charAt(0)!=text.charAt(0).toUpperCase())
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
        underlineColor="transparent"
      />
        {nameWarning==true?<Text      style={styles.warning}>Naziv je obavezan i  mora pocinjati velikim slovom</Text>:<View/>}
      
     
       {  globalWarning ==true?<Text  style={styles.warning}>Unesite sve podatke</Text>:<View/>}
      {  success ==true?<Text  style={styles.success}>Uspesno ste uneli knigu</Text>:<View/>}
      { uploadd==true?<ActivityIndicator/>:<View/> }
 
       <Pressable
          style={styles.button}
          onPress={UploadBooks} 
        >
          <Text style={styles.buttonText}>{"Unesite knjigu"}</Text>
        </Pressable>
       
       
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
  image:
  {
height:200,
width:200
  },
  warning: {
    height: 40,
    marginBottom: 10,
    color: 'red',
  },
  success: {
    height: 40,
    marginBottom: 10,
    color: 'green',
  },
  input: {
    width: 350,
    height: 55,

    margin: 10,
    padding: 8,


    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  button: {
    width: 150,
    backgroundColor: "green",
  
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
  }
  ,
  buttonText: {
    color:"white",
  fontWeight:"600",
  alignSelf:"center"
  }
};