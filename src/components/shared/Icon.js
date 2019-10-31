import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faEyeSlash, faEye , faPlusSquare, faUser} from '@fortawesome/free-regular-svg-icons';
import { faTimes, faCheck, faChevronDown, faPaperclip, faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar} from '@fortawesome/free-solid-svg-icons';


library.add(
    faEyeSlash, 
    faEye, 
    faPlusSquare, 
    faTimes, 
    faCheck, 
    faChevronDown, 
    faPaperclip, 
    farStar, 
    fasStar, 
    faUser,
    faPen
);

export const EyeSlashIcon = () => <FontAwesomeIcon icon={faEyeSlash}/>;

export const EyeIcon = () => <FontAwesomeIcon icon={faEye}/>;

export const PlusSignIcon = () => <FontAwesomeIcon icon={faPlusSquare} size='lg'/>

export const TimesIcon = () => <FontAwesomeIcon icon={faTimes} size='lg'/>

export const CheckIcon = () => <FontAwesomeIcon icon={faCheck} size='xs'/>

export const ChevronDownIcon = () => <FontAwesomeIcon icon={faChevronDown} size='xs'/>

export const PaperclipIcon = () => <FontAwesomeIcon icon={faPaperclip} size='sm'/>

export const RegularStarIcon = () => <FontAwesomeIcon icon={farStar} size='xs'/>

export const SolidStarIcon = () => <FontAwesomeIcon icon={fasStar} size='xs'/>

export const UserIcon = () => <FontAwesomeIcon icon={faUser} size='xs'/>

export const PenIcon = () => <FontAwesomeIcon icon={faPen} size='xs'/>
