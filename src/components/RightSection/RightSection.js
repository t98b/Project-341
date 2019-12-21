import React from 'react';
import { InputField } from './InputField/InputField'
import { BoardHeader } from './Header/BoardHeader'
import { MessageBoard } from './Board/MessageBoard'
import './../../App.css';
import './../Main.css';

export const RightSection = (props) => {
    return(
        <div className="main__layout--rightPannel">
            <SearchSection boardData={props.boardData} isDirectMessage={props.isDirectMessage}/>
            <MessageBoard boardData={props.boardData} />
            <InputField user={props.user} sendTo={props.boardData.id} isDirectMessage={props.isDirectMessage}/>
        </div>
    );
};

const SearchSection = (props) => {
    return(
        <div className="main__layout--search">
            <BoardHeader boardData={props.boardData} isDirectMessage={props.isDirectMessage}/>
        </div>
    );
};