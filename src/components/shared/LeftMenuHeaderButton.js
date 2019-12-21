import React from 'react';
import './../../App.css';

export const LeftMenuHeaderButton = (props) => {
    return (
        <div className="longButton__header">
            <span className="label__header label__header--title channel-header" onClick={props.search}>{props.label}</span> 
            <span className="label__header--icon" onClick={props.onClick}></span>
        </div>
    );
};