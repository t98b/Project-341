import React, {useState} from 'react';
import { InputField } from './InputField/InputField'
import { BoardHeader } from './Header/BoardHeader'
import { MessageBoard } from './Board/MessageBoard'
import './../../App.css';
import './../Main.css';

export const RightSection = () => {
    return(
        <div className="main__layout--rightPannel">
            <SearchSection></SearchSection>
            <MessageBoardSection></MessageBoardSection>
            <UserInputSection></UserInputSection>
        </div>
    );
};

const UserInputSection = () => {
    return(
        <div className="">
            <InputField user={'test'}/>
        </div>
    );
};

const MessageBoardSection = () => {
    return(
        <div className="main__layout--board">
            <MessageBoard />
            {/* ADD YOU CODE IN THIS SECTION */}
        </div>
    );
};

const SearchSection = () => {
    return(
        <div className="main__layout--search">
            {/* ADD YOU CODE IN THIS SECTION */}
            <BoardHeader />
        </div>
    );
};