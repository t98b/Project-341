import React, {useState} from 'react';
import './App.css';
import { Login } from './Login/Login.js';
import { Main } from './Main';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const App = () => {

  

  return (
    <div className="App">
      <Main> </Main>
  
    </div>
  );
}
export default App;
