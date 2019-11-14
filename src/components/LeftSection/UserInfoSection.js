import React, { useState } from 'react';
import './../Main.css';
import './../../App.css';
import { ChevronDownIcon } from '../shared/Icon';

export const UserInfoSection = (props) => {
    return(
        <div className="main__layout--userInfo">
            <ChannelName />
            <div><StatusIndicator user={props.user}/></div>
        </div>
    );
};

const StatusIndicator = (props) => {
    const user = props.user;
    return (
        <div className="status-indicator">
            <span className="status-username">{user.uid}</span>
        </div>
    );
}

const ChannelName = () => {
    return (
        <div>
            <span className="status-header">Project341</span> <div className="chevron"><ChevronDownIcon /></div>
        </div>
    );
}