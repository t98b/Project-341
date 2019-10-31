import React, { useState } from 'react';
import { PaperclipIcon } from './../../shared/Icon'
import './../../Main.css';
import './../../../App.css';
import firebase from 'firebase';

export const InputField = (props) => {
    const [message, setMessage] = useState('');
    const path = props.path;
    const context = props.context;
    const sendTo = props.sendTo;
    console.log(sendTo);

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
            let messagesRef = firebase.firestore().collection('channels').doc(sendTo);
            messagesRef.update({
                messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
            });
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