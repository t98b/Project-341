import React, { useState, useEffect } from 'react';
import './../../App.css';
import { LeftMenuHeaderButton } from '../shared/LeftMenuHeaderButton';
import firebase from 'firebase';

export const PersonalChatSection = (props) => {
    const [allUsers, setAllUsers] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const openSearch = () => {
        setShowSearch(true);
    };

    const closeSearch = () => {
        setShowSearch(false);
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

    const getUserbyID = (id) => {
        for (const user of allUsers) {
            if (user.id === id) {
                return user;
            }
        };
    }

    const selectUser = (event) => {
        const username = event.currentTarget.innerText;
        const user = getUser(username);

        if (!props.dms.includes(username)) {
            createDMWith(user);
        }
        setShowSearch(false);
    };

    const createDMWith = (user) => {
        const currentDate = new Date();
        const currentUser = getUserbyID(props.uid.uid);
        firebase.firestore().collection('directMessages').add({
            messages: [],
            date: currentDate,
            users:[
                {
                    name: currentUser.username,
                    id: currentUser.id,
                },
                {
                    name: user.username, 
                    id: user.id 
                }
            ]
        });
    };

    return(
        <div className="main__layout--chat">
            <LeftMenuHeaderButton
            onClick={openSearch}
            search={openSearch}
            label={'Direct Messages'} 
            />
            <DirectMessages 
            directMessages={props.directMessages} 
            uid={props.uid}
            onClick={props.onClick}
            dms={props.dms}
            />
            { showSearch ?  
                <div className="search-overlay">
                    <div className="search-overlay__header-container">
                        <span className="search-overlay__header">Create Direct Message</span>
                        <span className="search-overlay__close" onClick={closeSearch}> X </span>
                    </div>
                    <div className="search-overlay__body-container">
                    <div className="search-overlay__search-header"><span> List of all users </span></div>
                        {allUsers.map((user, index) => 
                            <div key={index} className="search-overlay__search-results" onClick={selectUser}>
                                <span>
                                    {user.username}
                                </span>
                            </div>
                        )}
                    </div>
                </div> : null 
            }
        </div>
    );
};

const DirectMessage = (props) => {
    return (
        <div className="section__channel container_channel" onClick={props.onClick}>
            <span onClick={props.onClick}>{props.name}</span>
        </div>
    );
}

const DirectMessages = (props) => {
    const dms = props.dms;
    const currentUser = props.uid;
    let filteredChats = [];

    const directMessageNaming = (dm) => {
        if (dm.users[0].id === currentUser.uid) {
            return dm.users[1].name;
        }
        return dm.users[0].name;
    }

    return (
        <div className="section__channels">
            { dms.map((chat, index) => 
                <DirectMessage 
                key={index} 
                name={directMessageNaming(chat)} 
                onClick={props.onClick} 
                />
            )}
        </div>
    );
}