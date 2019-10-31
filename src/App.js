import React, { useState, useEffect, useCallback} from 'react';
import './App.css';
import { Login } from './components/Login/Login';
import { Main } from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from './firebase.js'

export const App = () => {
  const [token, setToken] = useState();


  const getMarker = () => {
    const snapshot = firebase.firestore().collection('users').get()
  }

  const writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
  
  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
    }
  }, []);

  return (
    <div className="App">
      {getMarker()}
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
