import React, { useState, useEffect } from 'react';
import './UserInfoSection.css';
import { ChevronDownIcon, BellIcon } from '../../shared/Icon';
import firebase from '../../../firebase.config';

export const UserInfoSection = (props) => {
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        getUserUsername();
    });

    const getUserUsername = () => {
        firebase.database().ref('users/' + props.uid.uid).on('value', (snapshot) => {
            setData(snapshot.val().username);
        });
    }

    const setData = (newUsername) => {
        setUsername(newUsername)
    }

    return(
        <div className="header-layout">
            <ChannelName />
            <div><StatusIndicator username={username}/></div>
        </div>
    );
};

const StatusIndicator = (props) => {
    return (
        <div className="status-indicator">
            <span className="status-username">{props.username}</span>
        </div>
    );
}

const ChannelName = () => {
    return (
        <div>
            <span className="status-header">Project341</span> <div className="chevron"><ChevronDownIcon /></div> 
            <span className="status-notification-bell"><BellIcon/></span>
        </div>
    );
}