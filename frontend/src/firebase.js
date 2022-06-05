import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjEoUuZY15qifpV07FId06OoYOUGjHzWU",
  authDomain: "zoomessenger.firebaseapp.com",
  projectId: "zoomessenger",
  storageBucket: "zoomessenger.appspot.com",
  messagingSenderId: "1079557975838",
  appId: "1:1079557975838:web:9e0b6e111f0c26667ca30f",
  measurementId: "G-RYJDJB11J0"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db