import React, {useState} from 'react';

export const LeftSection = () => {
    return(
        <div className="main__layout--leftPannel">
            <UserInfoSection></UserInfoSection>
            <ChannelSection></ChannelSection>
            <PersonnalChatSection></PersonnalChatSection>
        </div>
    );
};