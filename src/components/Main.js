import React, {useState, useEffect} from 'react';
import { LeftSection } from './LeftSection/LeftSection';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from './../firebase.config';

export const Main = (props) => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [directMessages, setDirectMessages] = useState([]);
    const [context, setContext] = useState('');
    const [boardData, setBoardData] = useState(channels[0]);
    const [sendTo, setSendTo] = useState();
    const [loading, setLoading] = useState(true);

    const currentUser = firebase.auth().currentUser;

    useEffect(() => {
        fetchChannelsData();
        fetchDirectMessagesData();
    }, []);


    const fetchChannelsData = () => {
        firebase.firestore().collection("channels").onSnapshot((snap) => {
            //include channel array since before it was outside the listenner an
            let channelsAr = [];
            snap.forEach(channel => {
                channelsAr.push({
                    ...channel.data(),
                    id: channel.id
                });
            });
             setData(channelsAr);
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


    const setData = (d) => {
        setChannels(d);
        setBoardData(d[0]);
        setSendTo(d[0]);
        setLoading(false);
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
                setSendTo(channel.id)
                setSelectedChannel(channel.name);
                return setBoardData(channel);
            }
        }
    }

     return (
         <div className='main__layout' >
             {!loading && 
             <React.Fragment>
                 {
                 loading ? <h1>HELLO</h1>:
                    <React.Fragment>
                        <LeftSection 
                        channels={channels} 
                        directMessages={directMessages} 
                        onClick={clickMenu} 
                        uid={currentUser}
                        selectedChannel={boardData}
                        />
                        <RightSection 
                        sendTo={sendTo} 
                        data={boardData} 
                        />
                    </React.Fragment>
                 }
             </React.Fragment>
             }
         </div>
     );
};