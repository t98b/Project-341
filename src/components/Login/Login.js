import React, {useState} from 'react';
import './Login.css';
import { EyeIcon, EyeSlashIcon } from './../shared/Icon.js';
import firebase from './../../firebase.config';


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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState('password');

    const hidePasswordToggle = () => {
        return hidePassword === 'text' ? setHidePassword('password') : setHidePassword('text');
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        // const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
        }).catch(error => {
            console.log(error);
        });
    }

    return (  
        <div>
            <TextField 
            placeholder={'Email'}
            onChange={onEmailChange}>
            </TextField>
            <PasswordField 
            type={hidePassword} 
            placeholder={'Password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            onChange={onPasswordChange}
            ></PasswordField>
            <LoginButton label={'Sign In'} action={handleSubmit}></LoginButton>
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
    const [confirmPassword, setConfirmPassword] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const hidePasswordToggle = () => {
        return hidePassword === 'text' ? setHidePassword('password') : setHidePassword('text');
    }

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            console.log(result);
        }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // ...
        });
    }

    const handleSubmit = event => {
        if (password === confirmPassword) {
            event.preventDefault();
            // const {email, username, password} = this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                // const user = firebase.auth().currentUser;
                // user.updateProfile({displayName: username}).then(() => {
                //     this.props.history.push('/');
                // })
                // .catch(error => {
                //     this.setState({error});
                // });
            }).catch(error => {
                this.setState({error});
            });
        }
    }

    return (  
        <div className="container__signUp">
            <TextField placeholder={'Username'} onChange={onUsernameChange}></TextField>
            <TextField placeholder={'Email'} onChange={onEmailChange}></TextField>
            <PasswordField className="login__field--signUp" 
            type={hidePassword} 
            placeholder={'Password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            onChange={onPasswordChange}
            ></PasswordField>
            <PasswordField className="login__field--signUp" 
            type={hidePassword} 
            placeholder={'Confirm password'}
            hidePasswordToggle={hidePasswordToggle}
            hidePassword={hidePassword}
            onChange={onConfirmPasswordChange}
            ></PasswordField>
            <LoginButton label={'Sign me up!'} action={handleSubmit}></LoginButton>
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
            placeholder={props.placeholder}
            onChange={props.onChange}>
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
            placeholder={props.placeholder}
            onChange={props.onChange}>
            </input>
            <span className="login__icon" onClick={props.hidePasswordToggle}> {props.hidePassword === 'text' ? <EyeIcon /> : <EyeSlashIcon />} </span>
        </div>
    );
};

const LoginButton = (props) => {
    return (
        <button className="login__button login__button--email" onClick={props.action}>
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