import React, { useState, useEffect, useRef } from 'react';
import './../../../App.css';
import './../../Main.css';
import moment from 'moment';
import { UserIcon, PenIcon } from './../../shared/Icon';
import { BasicButton } from './../../shared/BasicButton';
import { FloatingLabelTextField } from './../../shared/FloatingLabelTextField';
import firebase from './../../../firebase.config';

export const MessageBoard = (props) => {
    const lastMessageRef = useRef();
    const node = useRef();
    const messages = props.boardData.messages;
    const data = props.boardData;
    const firstMessage = messages && messages.length > 0 ? messages[0] : null;
    let lastUser = '';
    let lastTime = firstMessage ? firstMessage.timestamp : new Date();

    const [showModal, setShowModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [hideSearchList, setHideSearchList] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    
    useEffect(() => {
        getUsers();
        if(messages.length > 0) {
            lastMessageRef.current.scrollIntoView();
        };
    }, [messages.length]);

    const onChange = event => {
        if (hideSearchList) {
            setHideSearchList(false);
        }
        setSearchValue(event.target.value);
        searchForUser(event.target.value);
        setEnableButton(uniqueUserFound(event.target.value));
    };

    const searchForUser = (string) => {
        let usersFilteredArray = [];
        allUsers.forEach(user => {
            const usernameSubstring = user.username.substring(0, string.length);
            if (usernameSubstring.toUpperCase() === string.toUpperCase()) {
                usersFilteredArray.push(user);
            }
        });
        setFilteredUsers(usersFilteredArray);
    };

    const userSelected = (event) => {
        setSearchValue(getUser(event.currentTarget.innerText).username);
        setHideSearchList(true);
        setEnableButton(uniqueUserFound(event.currentTarget.innerText));
    }

    const clickHandler = (event) => {
        if(!node.current.contains(event.target)){
            closeModal()();
        };
    };

    const addUserToChannel = () => {
        const userID = getUser(searchValue).id;

        firebase.firestore().collection("channels").doc(data.id).update({
            users: firebase.firestore.FieldValue.arrayUnion(
                userID
            )
        }).then(
            closeModal()
        );
    };

    const isDifferentUser = (LastMessageUser) => { 
        if(lastUser !== LastMessageUser) {
            return true;
        };
        return false;
    };

    const getUsers = () => {
        firebase.firestore().collection("users").onSnapshot((snap) => {
            snap.forEach(users => {
                setAllUsers(users.data().users);
            });
        });
    };

    const getUser = (selectedItem) => {
        for (const user of allUsers) {
            if (user.username === selectedItem) {
                return user;
            }
        };
    };

    const uniqueUserFound = (user) => {
        return (filteredUsers.filter((v) => (v.username.toUpperCase() === user.toUpperCase())).length) === 1;
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const isLongDelay = (lastMessageTime) => {
        const now = moment(lastTime.toDate());
        const end = moment(lastMessageTime.toDate());

        const duration = moment.duration(end.diff(now)).asHours();

        if (messages[0].time === lastMessageTime) {
            return true;
        };
        //Decided for 2hours for no particular reason
        if (duration > 2) {
            return true;
        };
        return false;
    };

    const setNewValue = (message) => {
        lastTime = message.timestamp;
        lastUser = message.user;
    };
    
    return(
        <div className="main__layout--board">
            <FirstMessage 
            data={data}
            addUsers={openModal}
            />
            {messages.map((message, index) => 
                <li ref={index === messages.length-1 ? lastMessageRef : null} key={index}>
                    {isLongDelay(message.timestamp) ? <TimeSeperator time={message.timestamp.toDate()} /> : null}
                    {isDifferentUser(message.user) || isLongDelay(message.timestamp) ? 
                        <MessageHeader
                        date={message.timestamp.toDate()} 
                        user={message.user} 
                        message={message.message}
                        /> : 
                        <SimpleMessage 
                        time={message.timestamp.toDate()} 
                        message={message.message} 
                        />
                    }
                    {setNewValue(message)}
                </li>
            )}
            {showModal ? <div className="section__overlay" onClick={clickHandler}>
                <div className="popUp" ref={node}>
                    <div className="popUp__top-small">
                        <span className="popUp__small-header">Add people</span> 
                        <span className="popUp__small-subHeader">{data.name}</span> 
                        <div className='closeButton__container'>
                            <span className='popUp__closeButton' onClick={closeModal}></span>
                        </div>
                    </div>
                    <div className="popUp__body">
                        <FloatingLabelTextField 
                        autofocus={true}
                        small={true}
                        placeholder='Yian, @steve, Paul' 
                        onChange={onChange} 
                        value={searchValue}
                        />
                    </div>
                    {searchValue && !hideSearchList ? <div className="userSearchList">
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => 
                            <span key={index} className="userSearchList__user" onClick={userSelected}>
                                {user.username}
                            </span>
                        ): 
                        <span> no results </span>
                        }
                    </div>
                    : null }
                    <div className="popUp__bottom">
                        <div className='popUp__button'>
                            <BasicButton 
                            disabled={!enableButton} 
                            label={'Add'} 
                            onClick={addUserToChannel}
                            />
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    );
};

const  UserAvatar = (props) => {
    const getFirstUserInitial = props.user.charAt(0);
    return (
        <div className="user-message-avatar">
            <span className="user-message-initial">{getFirstUserInitial}</span>
        </div>
    );
};

const ChatUserName = (props) => {
    return(
        <div className="">
            <span className="user-message-username">
                {props.user} 
                <span className="user-message-timestamp">
                {formatTime(props.time)}
                </span>
            </span>
        </div>
    );
};

const MessageHeader = (props) => {
    const messsageIsImg = props.message.includes("images");
    return (
        <div className="message-container">
            <UserAvatar user={props.user}/>
            <div className="message-header-container">
                <ChatUserName user={props.user} time={props.date}/>
                {messsageIsImg ? 
                    <img src={props.message} alt="image" className="image-aspect" />:
                    <span className="user-message">{props.message}</span>
                }
            </div>
        </div>
    );
};

const formatTime = (time) => {
    return moment(time).format("LT")
};

const SimpleMessage = (props) => {
    const messsageIsImg = props.message.includes("images");
    return(
        <div className="simple-message__container">
            <span className="simple-message__date">{formatTime(props.time)}</span>
            {messsageIsImg ? 
                <img src={props.message} alt="image" className="image-aspect" />:
                <span className="simple-message__text"> {props.message} </span>
            }
        </div>
    );
};


const FirstMessage = (props) => {
    const data = props.data;

    return(
        <div className="message-foreword">
            {data !== undefined ? 
                <React.Fragment>
                    <span className="foreword-title">{data.name}</span>
                    <span className="foreword-description">You created this channel on {moment.unix(data.date.seconds).format("dddd, MMMM Do")}. This is the very beginning of the <b>{data.name}</b> channel.</span>
                    <span className="foreword-buttons-container">
                        <ForeWordButton label={"Set a description"} icon={<PenIcon />}/> 
                        <ForeWordButton label={"Add an app"} isDisabled={true} icon={'+'}/> 
                        <ForeWordButton label={"Add people to this channel"} icon={<UserIcon />} onClick={props.addUsers}/> 
                    </span>
                </React.Fragment>
                : null
            }
        </div>
    );
};

const ForeWordButton = (props) => {
    return(
        <div className={props.isDisabled ? "foreword-buttons disabled" : "foreword-buttons enabled"} onClick={props.onClick}>
            <span className="foreword-icon">{props.icon}</span>{props.label} 
        </div>
    );
};

const TimeSeperator = (props) => {
    const dayString = moment(props.time).format("dddd, MMMM Do");
    return(
        <div className="time-seperator-container">
            <div className="time-separator-line">
            </div>
            <span className="time-separator-date">
                {`${dayString}`}
            </span>
            <div className="time-separator-line">
            </div>
        </div>
    );
};