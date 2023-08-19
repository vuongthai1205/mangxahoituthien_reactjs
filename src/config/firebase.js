// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-uT1FZGDzWg1gTJ1HKC7orOl5rK3KBjA",
  authDomain: "mangxahoituthien.firebaseapp.com",
  projectId: "mangxahoituthien",
  storageBucket: "mangxahoituthien.appspot.com",
  messagingSenderId: "69191351901",
  appId: "1:69191351901:web:4efab06fbd56d0392497b4"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;