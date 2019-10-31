import React, {useState, useEffect} from 'react';
import { LeftSection } from './LeftSection/LeftSection';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from 'firebase';

export const Main = () => {
    const [channels, setChannels] = useState([]);
    const [targetName, setTargetName] = useState('');
    const [context, setContext] = useState('');
    const [boardData, setBoardData] = useState(channels[0]);
    const [sendTo, setSendTo] = useState(channels[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let channelsAr = [];
        
        firebase.firestore().collection("channels").onSnapshot((snap) => {
            snap.forEach(channel => {
                channelsAr.push({
                    ...channel.data(),
                    id: channel.id
                });
            });

            setChannels(channelsAr);
            setLoading(false);
            console.log("New channels set", channels);
        });

        setSendTo(channels.id);
    }, [channels.length]);

    const clickMenu = (event) => {
        setTargetName(event.target.innerText);
        getChannelData(event.target.innerText);
    };
    

    const getChannelData = (menu) => {
        for(const channel of channels) {
            if (channel.name === menu) {
                setSendTo(channel.id)
                return setBoardData(channel);
            }
        }
    }

     return (
         <div className='main__layout' >
             {!loading && 
             <React.Fragment>
                <LeftSection channels={channels} onClick={clickMenu} />
                <RightSection sendTo={sendTo} data={boardData} />
             </React.Fragment>
             }
         </div>
     );
};