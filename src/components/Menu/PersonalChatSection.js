import React from 'react';
import './../../App.css';
import { LeftMenuHeaderButton } from '../shared/LeftMenuHeaderButton';
import firebase from 'firebase';

export const PersonalChatSection = (props) => {
    console.log(props.directMessages)
    return(
        <div className="main__layout--chat">
            <LeftMenuHeaderButton
            label={'Direct Messages'} 
            />
            <DirectMessages directMessages={props.directMessages} uid={props.uid}/>
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
    const dms = props.directMessages;
    const user = props.uid;
    let filteredChats = [];

    for (const dm of dms) {
        if (dm.user.includes(user.uid)){
            filteredChats.push(dm);
        }
    }

    const getName = (dm) => {
        let username = '';
        let userId = '';

        if(dm.user[0] === user.uid) {
            userId = dm.user[1]
        } else {
            userId = dm.user[0]
        }

        firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
            console.log(snapshot)
        });
    }

    return (
        <div className="section__channels">
            { filteredChats.map((chat) => 
                <DirectMessage key={chat.id} name={chat.name} onClick={props.onClick} />
            )}
        </div>
    );
}