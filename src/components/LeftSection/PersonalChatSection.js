import React from 'react';
import './../../App.css';
import { LeftMenuHeaderButton } from './../shared/LeftMenuHeaderButton';

export const PersonalChatSection = () => {
    return(
        <div className="main__layout--chat">
            {/* ADD YOU CODE IN THIS SECTION */}
            <LeftMenuHeaderButton
            label={'Direct Messages'} 
            />
        </div>
    );
};

const DirectMessage = (props) => {
    return (
        <div className="section__channel container_channel">
            <span onClick={props.onClick}>{props.name}</span>
        </div>
    );
}

const DirectMessages = (props) => {
    const chats = props.chats;
    return (
        <div className="section__channels">
            { chats.map((chat) => 
                <DirectMessage key={chat.id} name={chat.name} onClick={props.onClick} />
            )}
        </div>
    );
}