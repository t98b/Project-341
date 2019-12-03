import React, { useState } from 'react';
import './../Main.css';

export const FloatingLabelTextField = (props) => {
    const [inputLength, setInputLength] = useState(0);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const remainingChar = (event) => {
        const strLength = event.target.value.length;
        setInputLength(strLength);
        shouldDisplayErrorMessage(event);
    }; 

    const shouldDisplayErrorMessage = (event) => {
        if((event.target.value.length < 1) || (event.target.value.length > props.maxLength)){
            const error = errorToDisplay(event);
            setErrorMessage(error);
            return setShowError(true);
        }
        return setShowError(false);
    }

    const displayCharCount = () => {
        return props.maxLength !== undefined
    }

    const errorToDisplay = (event) => {
        return event.target.value.length > props.maxLength ? props.errorNameTooLong : props.errorEmptyField;
    }

    return(
        <div className={props.small ? 'container__floatingField--small' : 'container__floatingField'}
        onChange={remainingChar}>
            <div className='floatingField_container--header'>
                <span className='floatingField__header'>{props.header}</span>
                { props.optional ? <span className='floatingField__optional'>(optional)</span> : null} 
                { showError || props.exception ? 
                    <span className='floatingField__desc'> 
                        {props.exception ? props.errorEmptyField : errorMessage} 
                    </span> : null
                }
            </div>
            <div className={showError || props.exception ? 'floatingField_container--error' : 'floatingField_container'}>
                <span className='floatingField__icon'> {props.beforeIcon} </span>
                <input 
                type='text'
                className='floatingField__input'
                placeholder={props.placeholder}
                onChange={props.onChange}
                autoFocus={props.autofocus}
                > 
                </input>
                { displayCharCount() ? <span 
                className={inputLength > props.maxLength ? 'floatingField__length floatingField__length--error' : 'floatingField__length floatingField__length--ok'}> 
                    {props.maxLength - inputLength}
                </span> : null }
            </div>
            <span className='floatingField__underField'> { props.underField } </span>
        </div>
    );
};