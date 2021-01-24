import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import '../styles/Login.less';

export default function Login(props) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const redirectToMapAfterLoggingIn = () => {
        history.push('./map');
    };

    async function loginUser(e) {
        e.preventDefault();
        const userLogIn = {
            username,
            password
        };
        try {
            await axios.post(APIEndpoints.login, userLogIn, { withCredentials: true });
            props.updateSignedIn(userLogIn.username);
            redirectToMapAfterLoggingIn();
        } catch (error) {
            alert('User or password not correct');
            console.log(error);
        }
    }

    return (
        <div className='login-form'>
            <form method='post' action='#' autoComplete='off'>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text"
                        className="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password"
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={e => handlePasswordChange(e)}
                    ></input>
                </div>
                <button className='btn btn-primary' onClick={loginUser}>Login</button>
            </form>
        </div>
    );
}
