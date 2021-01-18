import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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

    // .then((res) => {
    //     console.log('login');
    //     console.log(res);
    //     // setUser(res.data, localStorage.setItem('user', JSON.stringify(res.data)));
    //     
    //     redirectToMapAfterLoggingIn();
    // });
    async function loginUser(e) {
        e.preventDefault();
        const userLogIn = {
            username,
            password
        };
        try {
            axios.post('https://app.yawe.dev/api/1/ce/vasco-da-gama/users?key=1f8d0c6bbd604833adfa5d2cf8095ef4&login=true',
                userLogIn, { withCredentials: true });
            props.updateSignedIn();
            redirectToMapAfterLoggingIn();
        } catch (error) {
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
