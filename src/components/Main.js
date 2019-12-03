import React, {useState, useEffect} from 'react';
import { Menu } from './Menu/Menu';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from './../firebase.config';

export const Main = () => {
    const [channels, setChannels] = useState([]);
    const [directMessages, setDirectMessages] = useState([]);
    const [boardData, setBoardData] = useState();
    const [loading, setLoading] = useState(true);
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
            console.log(currentUser.uid);
            snap.forEach(channel => {
                const channelData = channel.data();
                if(channelData.users.includes(currentUser.uid)){
                    channelsAr.push({
                        ...channelData,
                        id: channel.id
                    });
                }
            });
            console.log(channelsAr);
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
            snap.forEach(dm => {
                dms.push({
                    ...dm.data(),
                    id: dm.id
                });
            });
            setDms(dms);
        });
    }

    const setData = (data, i) => {
        setChannels(data)
        console.log(data);
        setBoardData(data[i]);
    }

    const setDms= (d) => {
        setDirectMessages(d);
    }

    const clickMenu = (event) => {
        getChannelData(event.currentTarget.lastElementChild.innerText);
    };
    

    const getChannelData = (menu) => {
        for(const channel of channels) {
            if (channel.name === menu) {
                setIndex(channels.indexOf(channel));
                return setBoardData(channel);
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
                onClick={clickMenu} 
                uid={currentUser}
                selectedChannel={boardData}
                />
                <RightSection 
                sendTo={boardData} 
                boardData={boardData}
                />
            </React.Fragment>
            }
        </div>
     );
};