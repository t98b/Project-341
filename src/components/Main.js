import React, {useState, useEffect} from 'react';
import { Menu } from './Menu/Menu';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from './../firebase.config';

export const Main = () => {
    const [channels, setChannels] = useState([]);
    const [allChannels, setAllChannels] = useState([]);
    const [directMessages, setDirectMessages] = useState([]);
    const [boardData, setBoardData] = useState();
    const [loading, setLoading] = useState(true);
    const [isDirectMessage, setIsDirectMessage] = useState(false);
    const [index, setIndex] = useState(0);

    const currentUser = firebase.auth().currentUser;

    useEffect(() => {
        fetchChannelsData();
        fetchDirectMessagesData();
    }, [index]);


    const fetchChannelsData = () => {
        firebase.firestore().collection("channels").onSnapshot((snap) => {
            setLoading(true);
            //include channel array since before it was outside the listenner an
            let channelsAr = [];
            let allChannelsAr = [];
            snap.forEach(channel => {
                const channelData = channel.data();
                if(channelData.users.includes(currentUser.uid)){
                    channelsAr.push({
                        ...channelData,
                        id: channel.id
                    });
                }
                allChannelsAr.push({
                    ...channelData,
                    id: channel.id
                })
            });
            setAllChannels(allChannelsAr);
            setData(channelsAr, index);
            if (channelsAr.length > 0) {
                setLoading(false);
            }
        });
    }

    const fetchDirectMessagesData= () => {
        firebase.firestore().collection("directMessages").onSnapshot((snap) => {
            //include channel array since before it was outside the listenner an
            let dms = [];
            snap.forEach(dmSnap => {
                const directMessage = dmSnap.data();
                let include = false;

                for (const message of directMessage.users) {
                    if(message.id === currentUser.uid) {
                        include = true;
                    }
                }

                if (include) {
                    dms.push({
                        ...directMessage,
                        id: dmSnap.id
                    });
                }
            });
            setDms(dms);
        });
    }

    const setData = (data, i) => {
        setChannels(data)
        setBoardData(data[i]);
    }

    const setDms= (d) => {
        setDirectMessages(d);
    }

    const clickChannelMenu = (event) => {
        setIsDirectMessage(false);
        getChannelData(event.currentTarget.lastElementChild.innerText);
    };

    const clickDMMenu = (event) => {
        setIsDirectMessage(true);
        getDmData(event.currentTarget.innerText);
    };
    
    const getChannelData = (menu) => {
        for(const channel of channels) {
            if (channel.name === menu) {
                setIndex(channels.indexOf(channel));
                return setBoardData(channel);
            }
        }
    }

    const getDmData = (name) => {
        for(const dm of directMessages) {
            if (dm.users[0].name === name || dm.users[1].name === name) {
                setIndex(directMessages.indexOf(dm));
                return setBoardData(dm);
            }
        }
    }

     return (
        <div className='main__layout' >
            {!loading &&
            <React.Fragment>
                <Menu 
                channels={channels} 
                directMessages={directMessages} 
                onChannelClick={clickChannelMenu}
                onDMClick={clickDMMenu}
                uid={currentUser}
                selectedChannel={boardData}
                allChannels={allChannels}
                dms={directMessages}
                />
                <RightSection 
                sendTo={boardData} 
                boardData={boardData}
                user={currentUser}
                isDirectMessage={isDirectMessage}
                />
            </React.Fragment>
            }
        </div>
     );
};