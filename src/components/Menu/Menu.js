import React from 'react';
import { UserInfoSection } from './UserInfoHeader/UserInfoSection';
import { ChannelSection } from './ChannelSection';
import { PersonalChatSection } from './PersonalChatSection';


export const Menu = (props) => {
    return(
        <div className="main__layout--leftPannel">
            <UserInfoSection 
            uid={props.uid}
            />
            <ChannelSection 
            channels={props.channels} 
            onClick={props.onClick} 
            uid={props.uid} 
            selectedChannel={props.selectedChannel}
            />
            <PersonalChatSection 
            directMessages={props.directMessages} 
            uid={props.uid} 
            onClick={props.onClick}
            />
        </div>
    );
};