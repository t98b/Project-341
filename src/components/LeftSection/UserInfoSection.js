import React, { useState } from 'react';
import './../Main.css';
import './../../App.css';
import { ChevronDownIcon } from '../shared/Icon';

export const UserInfoSection = () => {
    return(
        <div className="main__layout--userInfo">
            <ChannelName />
            <div><StatusIndicator/></div>
        </div>
    );
};

const StatusIndicator = (props) => {

    return (
        <div className="status-indicator">
            <span className="status-username">Alex</span>
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