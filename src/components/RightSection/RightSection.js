import React from 'react';
import { InputField } from './InputField/InputField'
import { BoardHeader } from './Header/BoardHeader'
import { MessageBoard } from './Board/MessageBoard'
import './../../App.css';
import './../Main.css';

export const RightSection = (props) => {
    console.log(props.boardData)
    return(
        <div className="main__layout--rightPannel">
            <SearchSection boardData={props.boardData} />
            <MessageBoard boardData={props.boardData} />
            <InputField user={'test'} sendTo={props.boardData.id}/>
        </div>
    );
};

const SearchSection = (props) => {
    return(
        <div className="main__layout--search">
            <BoardHeader boardData={props.boardData} />
        </div>
    );
};