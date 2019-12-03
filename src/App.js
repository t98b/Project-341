import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase, { auth } from './firebase.config';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [verified, setVerified] = useState(false);
  let currentUser;

  useEffect(() => {
    //listener
    verifyToken();

    if (typeof Notification !== "undefined") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        } else {
          console.log("Unable to get permission to notify.");
        }
      });
    }

    currentUser = firebase.auth().currentUser;
    console.log(currentUser);
    firebase.auth().onAuthStateChanged((newUser) => {
      if (user === currentUser) {
        setVerified(true);
      } else if (newUser) {
        setUser({
          displayName: newUser.newUser,
          email: newUser.email,
          uid: newUser.uid
        });
        setVerified(true);
        // ...
      } else {
        setVerified(false);
        // User is signed out.
        // ...
      }
    });
    
  }, [currentUser]);

  const verifyToken = () => {
    if (user === currentUser) {
      return setVerified(true);
    }
    return setVerified(false);
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          {verified ? 
            <React.Fragment>
            <Redirect to='/'/>
            <Route path="/">
              <Main user={user}/>
            </Route>
            </React.Fragment>
            :
            <React.Fragment>
              <Redirect to='/login'/>
              <Route path="/login">
              <Login />
              </Route>
            </React.Fragment>
          }
        </Switch>
      </Router>
    </div>
  );
};

export default App;
