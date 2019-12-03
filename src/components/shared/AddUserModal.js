import React, { useRef } from 'react';
import { FloatingLabelTextField } from './FloatingLabelTextField'
import { BasicButton } from './BasicButton'
import './../Main.css';
import './../../App.css'
import firebase from './../../firebase.config';

export const AddUserModal = (props) => {

    const node = useRef();

    const closeModal = () => props.closeModal;

    const clickHandler = (event) => {
        if(!node.current.contains(event.target)){
            closeModal()();
        }
    };

    return(
        <div className="section__overlay" onClick={clickHandler}>
            <div className="popUp" ref={node}>
                <div className="popUp__top-small">
                    <span className="popUp__small-header">Add people</span> 
                    <span className="popUp__small-subHeader">{props.channelName}</span> 
                    <div className='closeButton__container'>
                        <span className='popUp__closeButton' onClick={props.closeModal}></span>
                    </div>
                </div>
                <div className="popUp__body">
                    <FloatingLabelTextField 
                    autofocus={true}
                    small={true}
                    placehoder={'Yian, @steve, Paul'} 
                    onChange={props.onNameChange} 
                    />
                </div>
                <div className="popUp__bottom">
                    <div className='popUp__button'>
                        <BasicButton disabled={props.disabled} label={'Add'} onClick={props.onClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
};