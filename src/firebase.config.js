import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkMtloCvcSKjYLuv8mcUyRVj0-0Hd3vFs",
  authDomain: "slackish-5461d.firebaseapp.com",
  databaseURL: "https://slackish-5461d.firebaseio.com",
  projectId: "slackish-5461d",
  storageBucket: "gs://slackish-5461d.appspot.com",
  messagingSenderId: "843184095995",
  appId: "1:843184095995:web:ac0b8bb063955798a0265e",
  measurementId: "G-X9KDBC637T"
};

// var config = {
//   apiKey: "AIzaSyAdjVrArdzogXCzHHiml4RT6RlrSsgJYdc",
//   authDomain: "chatapp-3c59f.firebaseapp.com",
//   databaseURL: "https://chatapp-3c59f.firebaseio.com",
//   projectId: "chatapp-3c59f",
//   storageBucket: "gs://chatapp-3c59f.appspot.com",
//   messagingSenderId: "427833839481",
//   appId: "1:427833839481:web:9e185203829bd5e155a9a8"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;
