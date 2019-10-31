import React, {useState} from 'react';
import { CheckIcon } from './Icon';
import './../Main.css';

export const Toggle = (props) => {
    return(
        <div className='container__desc'>
            <div className='toggleDesc__container'>
                <div><span className='floatingField__header'>{props.toggleHeader}</span></div>
                <span className='toggle__text'> {props.toggleDesc}</span>
            </div>
            <div className='container__switch'>
                <div className={ props.selected ? 'toggle__container--selected ' : 'toggle__container' } onClick={props.onToggle}>
                    <div className='toggle__check'> {props.selected ? <CheckIcon /> : ''} </div>
                    <div className={ props.selected ? ' toggle__childSwitch toggle__childSwitch--selected toggle__container--selected ' : 'toggle__childSwitch' }></div>
                </div>
            </div>
        </div>
    );
};