import React, {useState, useEffect} from 'react';
import { LeftSection } from './LeftSection/LeftSection';
import './../App.css';
import { RightSection } from './RightSection/RightSection';
import firebase from 'firebase';

export const Main = () => {
    const [channels, setChannels] = useState([]);

    firebase.firestore().collection("channels").get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setChannels(doc);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    useEffect(() => {
        let channelsAr = [];
        
        firebase.firestore().collection("channels").get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setChannels(doc);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        firebase.firestore().collection("channels").onSnapshot((channels) => {
            channels.forEach(channel => {
                console.log(channel.data());
                console.log(channel.id);
                //firebase.firestore().collection("channels").doc(channel.id).set({id:channel.id});
                channelsAr.push(channel.data());
            });
        });
        setChannels(channelsAr);
    }, []);

     return (
         <div className='main__layout' > 
            <LeftSection channels={[channels]}></LeftSection>
            <RightSection></RightSection>
         </div>
     );
};