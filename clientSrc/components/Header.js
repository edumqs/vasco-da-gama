import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Header.less';

const Header = (props) => {
    const [username, setUsername] = useState('');

    // eslint-disable-next-line no-unused-vars
    const retrieveUserData = (() => {
        // Must retrieve the specific user from database
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                setUsername(res.data.username);
            });
    })();

    if (props.signedIn === false) {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className='navbar-left'>
                    <i className="fab fa-wpexplorer"></i>
                    <a className="navbar-brand" href="/">Vasco-Da-Gama</a>
                </div>
                <div className='navbar-right'>
                    <a className="navbar-brand" href="login">Login</a>
                    <a className="navbar-brand" href="registration">Register</a>
                </div>
            </nav>
        );
    // eslint-disable-next-line no-else-return
    } else {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className='navbar-left'>
                    <i className="fab fa-wpexplorer"></i>
                    <a className="navbar-brand" href="/">Vasco-Da-Gama</a>
                </div>
                <div className='navbar-right'>
                    <a className="navbar-brand" href="login">Welcome, {username}</a>
                    <a className="navbar-brand" href="login" onClick={props.updateSignedIn}>Sign Out</a>
                </div>
            </nav>
        );
    }
};

export default Header;
