import React from 'react';
import Button from '@mui/material/Button';
import './Login.css';
import { auth,provider } from '../../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

const Login = () => {
    const [ { } ,dispatch]= useStateValue()
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(error=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://i.ibb.co/sqNRPsQ/nft-art-logo-design-template-7bc8ffc9ccb4d7a91524b1bd36100d19-screen.jpg" alt="artmessenger"/>
                <div className="login__text">
                    <h1>Sign In ArtMessenger</h1>
                </div>
                <Button onClick={signIn}>SignIn with Google</Button>
            </div>   
        </div>
    );
}

export default Login;
