import React from 'react';
import './Login.css';
import { Button } from "@material-ui/core";
import { auth, provider } from './features/firebase';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => 
        alert(error.message));
    }

    return (
        <div className="login">
            <div className="login_logo">
                <img src="https://i.imgur.com/dhf1w4L.png" alt=""></img>
                <h1>HactuallyChat</h1>
            </div>

            <div className="break"></div>
           

            <Button onClick={ signIn }>Sign In</Button>
        </div>
    )
}

export default Login;