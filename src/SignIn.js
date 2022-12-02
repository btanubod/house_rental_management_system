import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

import './SignIn.css';

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                navigate('/');
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                if (userCredentials) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return(
        <div className="signin">
            <Link to="/">
            <img className="signin_logo"
                 src="https://pngimg.com/uploads/house/house_PNG1.png"
                 alt =""
            />

            </Link>

            <div className='signin_container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='signInButton' onClick={signIn}>Sign In</button>
                </form>

                <br />
                <br />

                <h5> New user? Create your account here. </h5>

                <button className='registerButton' onClick={register}>Create your Account</button>

            </div>

        </div>
    );
}
export default SignIn;