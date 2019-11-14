import React, {useState, useEffect} from 'react';
import { LeftSection } from './LeftSection/LeftSection';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from './../firebase.config';

export const Main = (props) => {
    const [channels, setChannels] = useState([]);
    const [targetName, setTargetName] = useState('');
    const [context, setContext] = useState('');
    const [boardData, setBoardData] = useState();
    const [sendTo, setSendTo] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChannelsData();
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


    const setData = (d) => {
        setChannels(d);
        setBoardData(d[0]);
        setSendTo(d[0]);
        setLoading(false);
        
    }

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
                 {
                 loading ? <h1>HELLO</h1>:
                    <React.Fragment>
                        <LeftSection channels={channels} onClick={clickMenu} user={props.user}/>
                        <RightSection sendTo={sendTo} data={boardData} />
                    </React.Fragment>
                 }
             </React.Fragment>
             }
         </div>
     );
};