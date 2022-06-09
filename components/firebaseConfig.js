import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyChEpjn7KbCrqd6Sw4LmlQgy-Q3EzZw0pA",
  authDomain: "somativanetfli.firebaseapp.com",
  databaseURL: "https://somativanetfli-default-rtdb.firebaseio.com",
  projectId: "somativanetfli",
  storageBucket: "somativanetfli.appspot.com",
  messagingSenderId: "450978889045",
  appId: "1:450978889045:web:a98b7da6b297b3e17ac3dc",
  measurementId: "G-J8B2WW06S8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
