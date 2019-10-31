import React, { useState } from 'react';
import { PaperclipIcon } from './../../shared/Icon'
import './../../Main.css';
import './../../../App.css';
import firebase from 'firebase';

export const InputField = (props) => {
    const [message, setMessage] = useState('');

    const onChange = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = (event) => {	
        event.preventDefault();		
        if (message !== '') {
            const newMessage = {
                message: message,
                user: props.user,
                timestamp: new Date()
            }
            firebase.firestore().collection('messages').add(newMessage);
            console.log("asldkja");
        }
        setMessage('');
    }

    return(
        <form className="input-field-container" onSubmit={sendMessage}>
            <span className="input-field-container--icon"><PaperclipIcon /></span>
            <input className="input-field-container--inputField" value={message} onChange={onChange} placeholder={'Message '} />
        </form>
    );
};