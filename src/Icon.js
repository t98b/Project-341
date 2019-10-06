import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

library.add(faEyeSlash, faEye);

export const EyeSlash = () => <FontAwesomeIcon icon={faEyeSlash}/>

export const Eye = () => <FontAwesomeIcon icon={faEye}/>

