import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/normalize.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXVj9nMPaSzCBMWNvYigKiTRyJtHf2qYU",
  authDomain: "speach-emotion-recognition.firebaseapp.com",
  projectId: "speach-emotion-recognition",
  storageBucket: "speach-emotion-recognition.appspot.com",
  messagingSenderId: "142365619462",
  appId: "1:142365619462:web:7575cc82e2d78661be1a87"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(<App />,  document.getElementById('root'));

