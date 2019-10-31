import React, { useState } from 'react';
import './../../App.css';
import { LeftMenuHeaderButton } from './../shared/LeftMenuHeaderButton';
import { Toggle } from './../shared/toggle';
import { BasicButton }  from './../shared/BasicButton';
import { FloatingLabelTextField } from './../shared/FloatingLabelTextField';
import firebase from 'firebase';


export const ChannelSection = (props) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [privateChannel, setPrivateChannel] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [selected, setSelected] = useState(false);

    const click = () => {
        setShowOverlay(true);
    };

    const toggle = () => {
        const opposite = !privateChannel;
        setPrivateChannel(opposite)
    }

    const close = () => {
        setShowOverlay(false);
        setPrivateChannel(false)
    };

    const onChannelNameChange= (event) => {
        setName(event.target.value);
        if(event.target.value.length > 0) {
            setDisabled(false);
        }
    };

    const onChannelDescChange= (event) => {
        setDesc(event.target.value);
        if(event.target.value.length > 0) {
            setDisabled(false);
        }
    };

    const onSubmit = () => {
        const currentDate = new Date();
        firebase.firestore().collection('channels').add({
            name: name,
            privateChannel: privateChannel,
            messages: [],
            description: desc,
            date: currentDate
        });
        close(); //close pop-up after adding channel
    };

    return(
        <div className="main__layout--channels">
            <LeftMenuHeaderButton
            label={'Channels'} 
            onClick={click}
            />
            <Channels 
            channels={props.channels} 
            onClick={props.onClick}
            />
           { showOverlay ? <PopUpAddChannel 
           disabled={disabled}
           closeOverlay={close} 
           selected={privateChannel}
           onNameChange={onChannelNameChange} 
           onDescChange={onChannelDescChange} 
           onSubmit={onSubmit}
           onToggle={toggle}
           /> : null }
        </div>
    );
};

const Channel = (props) => {
    return (
        <div className="section__channel container_channel">
            <span className="section__channel--hashtag">#</span> <span onClick={props.onClick}>{props.name}</span>
        </div>
    );
}


const Channels = (props) => {
    const channels = props.channels;
    return (
        <div className="section__channels">
            { channels.map((channel) => 
                <Channel key={channel.id} name={channel.name} onClick={props.onClick}/>
            )}
        </div>
    );
}

const PopUpAddChannel = (props) => {
    const emptyFieldMessage = 'Don’t forget to name your channel.';
    const nameTooLongMessage = 'Channel names can’t be longer than 80 characters.';
    const channelDescription = 'Channels are where your members communicate. They\'re best when organized around a topic - #proj-budget, for example.'
    const toggleDefaultDesc = 'When a channel is set to private, it can only be viewed or joined by invitation.';
    const toggleSelectedDesc = 'This can’t be undone. A private channel cannot be made public later on.';
    const underField = 'What’s this channel about?';

    const displayToggleDesc = props.selected ? toggleSelectedDesc : toggleDefaultDesc;

    return(
        <div className="section__overlay" >
            <div className="popUp">
                <div className="popUp__top">
                    <span className="popUp__header">{props.selected ? 'Create a private channel': 'Create a channel'}</span> 
                    <div className='closeButton__container'>
                        <span className='popUp__closeButton' onClick={props.closeOverlay}></span>
                    </div>
                </div>
                <div className="popUp__body">
                    <div>
                        <span className='popUp_briefDesc'> {channelDescription} </span>
                    </div>
                    <FloatingLabelTextField 
                    header={'Name'} 
                    errorEmptyField={emptyFieldMessage} 
                    errorNameTooLong={nameTooLongMessage}
                    beforeIcon={'#'} 
                    placehoder={'e.g. plan-budget'} 
                    onChange={props.onNameChange} 
                    maxLength={80}
                    />
                    <FloatingLabelTextField 
                    header={'Description'} 
                    optional={true} 
                    onChange={props.onDescChange} 
                    beforeIcon={'#'}
                    underField={underField}
                    />

                    <Toggle 
                    toggleHeader='Make private'
                    toggleDesc={displayToggleDesc}
                    onToggle={props.onToggle} 
                    selected={props.selected} 
                    />
                </div>
                <div className="popUp__bottom">
                    <div className='popUp__button'>
                        <BasicButton disabled={props.disabled} label={'Create'} onClick={props.onSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}