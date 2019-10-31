import React, { useState } from 'react';
import './../../Main.css';
import './../../../App.css';
import { RegularStarIcon, UserIcon, PenIcon } from './../../shared/Icon';
import ReactTooltip from 'react-tooltip'

export const BoardHeader = (props) => {
    return(
        <div className="board-header">
            <div className="board-header__title-section">
                <span className="board-header__title-name">#{props.channelName}test1234</span>
                <span className="board-header__title-icons">
                    <span data-tip="Star this channel" className="board-icon board-icon--star"> 
                        <RegularStarIcon />
                    </span> 
                    <span className="board-seperator">|</span>
                    <span className="board-icon board-icon--user"> 
                        <UserIcon /> {props.usersCount}
                    </span> 
                    <span className="board-seperator">|</span> 
                    <span className="board-icon board-icon--star"> 
                        <RegularStarIcon />
                    </span> 
                    <span className="board-seperator">|</span> 
                    <AddTopicField />
                </span>
            </div>
            <div className="board-header__search-section">
                hi
            </div>
            <ReactTooltip className="tool-tip" place="bottom" type="dark" effect="solid" delayShow={200}/>
        </div>
    );
};

const AddTopicField = () => {
    return (
        <div className="container-inlineFlex">
            <div className="container-add-topic">
                <div className="add-field-container">
                    <span className="pen-icon"><PenIcon /></span> Add a topic
                </div>
                <div className="header-button__edit clickable">Edit</div>
            </div>
        </div>
    );
}