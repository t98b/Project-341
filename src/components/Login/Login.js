import React, {useState} from 'react';
import './Login.css';
import { EyeIcon, EyeSlashIcon } from './../shared/Icon.js';
import firebase from 'firebase';


export const Login = () => {

    const [signUp, setSignUp] = useState(false);
    const [fieldsEmpty, setFieldsEmpty] = useState(true);

    const showSignUp = () => {
        return setSignUp(true)
    };

    const showLoginIn = () => {
        return setSignUp(false)
    };

    return (
        <div className="login">
            <Slackish></Slackish> 
            {signUp ? <SignUpForm goBackTo={showLoginIn}></SignUpForm> : <LoginForm showSignUp={showSignUp}></LoginForm>}
        </div>
    );
};

const Slackish = () => {
    return (
        <div className="text__container">
            <span className='login__title'> #SLACKISH </span>
        </div>
    );
};

const LoginForm = (props) => {
    const [hidePassword, setHidePassword] = useState('password');

    const hidePasswordToggle = () => {
        return hidePassword === 'text' ? setHidePassword('password') : setHidePassword('text');
    }

    return (  
        <div>
            <TextField placeholder={'Username/Email'}></TextField>
            <PasswordField 
            type={hidePassword} 
            placeholder={'Password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            ></PasswordField>
            <LoginButton label={'Sign In'}></LoginButton>
            <SignUpButton showSignUp={props.showSignUp}></SignUpButton>
            {/* Facebook Button */}
            <div className="fb-login-button" 
            data-width="180" 
            data-size="large" 
            data-button-type="continue_with" 
            data-auto-logout-link="false" 
            data-use-continue-as="false"></div>
        </div>
    );
};

const SignUpForm = (props) => {

    const [hidePassword, setHidePassword] = useState('password');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const hidePasswordToggle = () => {
        return hidePassword === 'text' ? setHidePassword('password') : setHidePassword('text');
    }

    const handleSubmit = event => {
        event.preventDefault();
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
        }).catch(error => {
            this.setState({error});
        });
    }

    return (  
        <div className="container__signUp">
            <TextField placeholder={'Username'}></TextField>
            <TextField placeholder={'Email'}></TextField>
            <PasswordField className="login__field--signUp" 
            type={hidePassword} 
            placeholder={'Password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            ></PasswordField>
            <PasswordField className="login__field--signUp" 
            type={hidePassword} 
            placeholder={'Confirm password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            ></PasswordField>
            <LoginButton label={'Sign me up!'}></LoginButton>
            <CancelButton goBackTo={props.goBackTo}></CancelButton>
        </div>
    );
};

const TextField = (props) => {
    return (
        <div className="container__textField">
            <input
            type={props.type}
            className='login__field'
            placeholder={props.placeholder}>
            </input>
        </div>
    );
};

const PasswordField = (props) => {
    return (
        <div className="container__textField">
            <input
            type={props.type}
            className='login__field'
            placeholder={props.placeholder}>
            </input>
            <span className="login__icon" onClick={props.hidePasswordToggle}> {props.hidePassword === 'text' ? <EyeIcon /> : <EyeSlashIcon />} </span>
        </div>
    );
};

const LoginButton = (props) => {
    return (
        <button className="login__button login__button--email">
            {props.label}
        </button>
    );
}

const CancelButton = (props) => {
    return (
        <div>
            <button className="login__button login__button--cancel" onClick={props.goBackTo}>
                Cancel
            </button>
        </div>
    );
}

const SignUpButton = (props) => {
    return(
        <p>
            Don't have an account? <span className="link" onClick={props.showSignUp}>Create one now!</span>
        </p>
    );
};