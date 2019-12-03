import React, { useState } from 'react';
import './../../Main.css';
import './../../../App.css';
import { RegularStarIcon, UserIcon, PenIcon, Pin } from './../../shared/Icon';
import ReactTooltip from 'react-tooltip'

export const BoardHeader = (props) => {
    const data = props.boardData;
    return(
        <div className="board-header">
            {data &&             
                <div className="board-header__title-section">
                    <span className="board-header__title-name">#{data.name}</span>
                    <span className="board-header__title-icons">
                        <span data-tip="Star this channel" className="board-icon board-icon--star"> 
                            <RegularStarIcon />
                        </span> 
                        <span className="board-seperator">|</span>
                        <span className="board-icon board-icon--user"> 
                            <UserIcon /> 
                            <span className="board-iconText">{data.users.length}</span>
                        </span> 
                        <span className="board-seperator">|</span> 
                        <span className="board-icon board-icon--user"> 
                            <Pin />
                        </span> 
                        <span className="board-seperator">|</span> 
                        <AddTopicField />
                    </span>
                </div>
            }
            <div className="board-header__search-section">
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