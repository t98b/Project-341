import React, {useState} from 'react';
import { InputField } from './InputField/InputField'
import { BoardHeader } from './Header/BoardHeader'
import { MessageBoard } from './Board/MessageBoard'
import './../../App.css';
import './../Main.css';

export const RightSection = (props) => {
    return(
        <div className="main__layout--rightPannel">
            <SearchSection data={props.data} />
            <MessageBoardSection data={props.data} />
            <InputField user={'test'} sendTo={props.sendTo}/>
        </div>
    );
};

const MessageBoardSection = (props) => {
    return(
        <div className="main__layout--board">
            <MessageBoard data={props.data} />
            {/* ADD YOU CODE IN THIS SECTION */}
        </div>
    );
};

const SearchSection = (props) => {
    return(
        <div className="main__layout--search">
            {/* ADD YOU CODE IN THIS SECTION */}
            <BoardHeader data={props.data} />
        </div>
    );
};