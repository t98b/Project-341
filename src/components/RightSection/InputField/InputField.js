import React, { useState } from 'react';
import { PaperclipIcon } from './../../shared/Icon'
import './../../Main.css';
import './../../../App.css';
import firebase from 'firebase';

export const InputField = (props) => {
    const [message, setMessage] = useState('');
    const path = props.path;
    const context = props.context;

    const onChange = (event) => {
        setMessage(event.target.value);
    }

    const isDirectMessage = () => {
        return 
    }

    const sendMessage = (event) => {	
        event.preventDefault();		
        if (message !== '') {
            const newMessage = {
                message: message,
                user: props.user,
                timestamp: new Date()
            }
            firebase.firestore().collection('messages').doc(`${props.sendTo}`).add(newMessage);
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