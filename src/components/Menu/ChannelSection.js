import React, { useState, useRef } from 'react';
import './../../App.css';
import './Menu.css';
import { LeftMenuHeaderButton } from '../shared/LeftMenuHeaderButton';
import { Toggle } from '../shared/toggle';
import { BasicButton }  from '../shared/BasicButton';
import { FloatingLabelTextField } from '../shared/FloatingLabelTextField';
import firebase from 'firebase';
import moment from 'moment';



export const ChannelSection = (props) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [privateChannel, setPrivateChannel] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [channelExists, setchannelExists] = useState(false);
    const participants = props.uid;
    const channels = props.allChannels;

    const formatTime = (time) => {
        return moment(time).format("dddd, MMMM Do");
    };

    const openModal = () => {
        setShowOverlay(true);
    };

    const openSearch = () => {
        setShowSearch(true);
    };

    const toggle = () => {
        const opposite = !privateChannel;
        setPrivateChannel(opposite)
    }

    const closeModal = () => {
        setShowOverlay(false);
        setPrivateChannel(false)
    };

    const closeSearch = () => {
        setShowSearch(false);
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

    const selectChannel = (event) => {
        const item = event.currentTarget.innerText;
        const channelHeader = item.split("\n")[0];
        const channelName = channelHeader.substring(2, channelHeader.length);
        const channel = getChannel(channelName);

        if (!channel.users.includes(participants)) {
            addUserToChannel(channel.id);
        }
        setShowSearch(false);
    }

    const getChannel = (name) => {
        for (const channel of channels) {
            if (channel.name === name) {
                return channel;
            }
        }
    }

    const onChannelDescChange= (event) => {
        setDesc(event.target.value);
    };

    const onSubmit = () => {
        const currentDate = new Date();
        firebase.firestore().collection('channels').add({
            name: name,
            privateChannel: privateChannel,
            messages: [],
            description: desc,
            date: currentDate,
            users:[]
        }).then((docRef) => {
            addUserToChannel(docRef.id)
        });
        closeModal(); //close pop-up after adding channel
    };

    const addUserToChannel = (id) => {
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
            search={openSearch}
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
           { showSearch ?  
                <div className="search-overlay">
                    <div className="search-overlay__header-container">
                        <span className="search-overlay__header">Join Channels</span>
                        <span className="search-overlay__close" onClick={closeSearch}> X </span>
                    </div>
                    <div className="search-overlay__body-container">
                    <span className="search-overlay__search-header"> List of all available channels </span>
                        {channels.map((channel, index) => 
                            <div key={index} className="search-overlay__search-results" onClick={selectChannel}>
                                <span>
                                    # {channel.name}
                                </span>
                                <span className="search-overlay__search-results-date">
                                    Created on {formatTime(channel.date.toDate())}
                                </span>
                            </div>
                        )}
                    </div>
                </div> : null 
            }
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
};


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
};

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
                    <FloatingLabelTextField 
                    header={'Name'}
                    exception={props.channelExists}
                    errorEmptyField={props.channelExists ? channelAlreadyExistError : emptyFieldMessage} 
                    errorNameTooLong={nameTooLongMessage}
                    beforeIcon={'#'} 
                    placeholder={'e.g. plan-budget'} 
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
};
