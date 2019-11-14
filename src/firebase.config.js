import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";
var config = {
  apiKey: "AIzaSyAdjVrArdzogXCzHHiml4RT6RlrSsgJYdc",
  authDomain: "chatapp-3c59f.firebaseapp.com",
  databaseURL: "https://chatapp-3c59f.firebaseio.com",
  projectId: "chatapp-3c59f",
  storageBucket: "",
  messagingSenderId: "427833839481",
  appId: "1:427833839481:web:9e185203829bd5e155a9a8"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
