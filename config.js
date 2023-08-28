export const baseUlr="http://amiiiii-001-site1.gtempurl.com/"
import  firebase  from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/firestore";
import  "firebase/compat/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ai50mlK8SxUwOj8LYtb-cox5DUsbCN8",
  authDomain: "library-a1c76.firebaseapp.com",
  projectId: "library-a1c76",
  storageBucket: "library-a1c76.appspot.com",
  messagingSenderId: "404653982041",
  appId: "1:404653982041:web:74f286beba30de0cafcc48"
};

// Initialize Firebase
if(!firebase.apps.length)
{firebase.initializeApp(firebaseConfig)}

export {firebase}

