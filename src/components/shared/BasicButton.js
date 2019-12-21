import React from 'react';

export const BasicButton = (props) => {
    return(
        <button 
        className={ props.disabled ? 'basicButton basicButton--disabled' : 'basicButton basicButton--enabled'} 
        onClick={props.onClick}>
            {props.label}
        </button>
    );
};