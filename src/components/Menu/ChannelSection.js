import React, { useState, useRef } from 'react';
import './../../App.css';
import { LeftMenuHeaderButton } from '../shared/LeftMenuHeaderButton';
import { Toggle } from '../shared/toggle';
import { BasicButton }  from '../shared/BasicButton';
import { FloatingLabelTextField } from '../shared/FloatingLabelTextField';
import firebase from 'firebase';
import { EventEmitter } from 'events';


export const ChannelSection = (props) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [privateChannel, setPrivateChannel] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [channelExists, setchannelExists] = useState(false);
    const participants = props.uid;

    const openModal = () => {
        setShowOverlay(true);
    };

    const toggle = () => {
        const opposite = !privateChannel;
        setPrivateChannel(opposite)
    }

    const closeModal = () => {
        setShowOverlay(false);
        setPrivateChannel(false)
    };

    const onChannelNameChange= (event) => {
        setName(event.target.value);

        if(event.target.value.length > 0) {
            if (channelAlreadyExist(event.target.value)) {
                setchannelExists(true);
                return setDisabled(true);
            }
            setchannelExists(false);
            return setDisabled(false);
        } else {
            return setDisabled(true);
        }
    };

    const channelAlreadyExist = (value) => {
        for(const chan of props.channels) {
            if (value === chan.name) {
                return true
            }
        }
        return false;
    }

    const onChannelDescChange= (event) => {
        setDesc(event.target.value);
    };

    const onSubmit = () => {
        let id = '';
        const currentDate = new Date();
        firebase.firestore().collection('channels').add({
            name: name,
            privateChannel: privateChannel,
            messages: [],
            description: desc,
            date: currentDate,
            users:[]
        }).then((docRef) => {
            id = docRef.id
            addChannelCreatorToGroup(docRef.id)
        });
        closeModal(); //close pop-up after adding channel
    };

    const addChannelCreatorToGroup = (id) => {
        let ref = firebase.firestore().collection("channels").doc(id);
        ref.update({
            users: firebase.firestore.FieldValue.arrayUnion(
                participants.uid
            )
        });
    };

    return(
        <div className="main__layout--channels">
            <LeftMenuHeaderButton
            label={'Channels'} 
            onClick={openModal}
            />
            <Channels 
            channels={props.channels} 
            selectedChannel={props.selectedChannel}
            onClick={props.onClick}
            uid={props.uid}
            />
           { showOverlay ? <PopUpAddChannel 
           disabled={disabled}
           channelExists={channelExists}
           channels={props.channels}
           closeOverlay={closeModal} 
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
        <div className={props.selectedChannel ? "section__channel no-select section__channel--selected" : "section__channel no-select"} 
        onClick={props.onClick}>
            <span className="section__channel--hashtag">#</span> <span>{props.name}</span>
        </div>
    );
}


const Channels = (props) => {
    const selectedChannel = (channel) => {
        return props.selectedChannel === channel;
    }

    return (
        <div className="section__channels">
            {props.channels.map((channel) => 
                <Channel key={channel.id} name={channel.name} onClick={props.onClick} selectedChannel={selectedChannel(channel)}/>
            )}
        </div>
    );
}

const PopUpAddChannel = (props) => {
    const node = useRef();

    const emptyFieldMessage = 'Don’t forget to name your channel.';
    const channelAlreadyExistError = 'That name is already taken by a channel, username, or user group'
    const nameTooLongMessage = 'Channel names can’t be longer than 80 characters.';
    const channelDescription = 'Channels are where your members communicate. They\'re best when organized around a topic - #proj-budget, for example.'
    const toggleDefaultDesc = 'When a channel is set to private, it can only be viewed or joined by invitation.';
    const toggleSelectedDesc = 'This can’t be undone. A private channel cannot be made public later on.';
    const underField = 'What’s this channel about?';

    const displayToggleDesc = props.selected ? toggleSelectedDesc : toggleDefaultDesc;

    const closeModal = () => props.closeOverlay;

    const clickHandler = (event) => {
        if(!node.current.contains(event.target)){
            closeModal()();
        }
    };

    return(
        <div className="section__overlay" onClick={clickHandler}>
            <div className="popUp" ref={node}>
                <div className="popUp__top">
                    <span className="popUp__header">{props.selected ? 'Create a private channel' : 'Create a channel'}</span> 
                    <div className='closeButton__container'>
                        <span className='popUp__closeButton' onClick={props.closeOverlay}></span>
                    </div>
                </div>
                <div className="popUp__body">
                    <div>
                        <span className='popUp_briefDesc'> {channelDescription} </span>
                    </div>
                    {console.log(props.channelExists)}
                    <FloatingLabelTextField 
                    header={'Name'}
                    exception={props.channelExists}
                    errorEmptyField={props.channelExists ? channelAlreadyExistError : emptyFieldMessage} 
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