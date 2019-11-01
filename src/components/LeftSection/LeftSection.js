import React, {useState} from 'react';
import { UserInfoSection } from './UserInfoSection';
import { ChannelSection } from './ChannelSection';
import { PersonalChatSection } from './PersonalChatSection';
import { tsPropertySignature } from '@babel/types';


export const LeftSection = (props) => {
    return(
        <div className="main__layout--leftPannel">
            <UserInfoSection />
            <ChannelSection channels={props.channels} onClick={props.onClick}/>
            <PersonalChatSection />
        </div>
    );
};