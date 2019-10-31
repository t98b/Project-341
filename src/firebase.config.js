import firebase from "firebase/app";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyAdjVrArdzogXCzHHiml4RT6RlrSsgJYdc",
  authDomain: "chatapp-3c59f.firebaseapp.com",
  databaseURL: "https://chatapp-3c59f.firebaseio.com",
  projectId: "chatapp-3c59f",
  storageBucket: "chatapp-3c59f.appspot.com",
  messagingSenderId: "427833839481",
  appId: "1:427833839481:web:9e185203829bd5e155a9a8"
};
firebase.initializeApp(config);

//const storage = firebase.storage();
export default firebase;
