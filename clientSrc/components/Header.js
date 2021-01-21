import React from 'react';
import '../styles/Header.less';

export default function Header(props) {
    let navbarRight;
    if (props.signedIn === false) {
        navbarRight = <div><a className="navbar-brand" href="login">Login</a>
            <a className="navbar-brand" href="registration">Register</a></div>;
    } else {
        navbarRight = <div><a href='/profile' className="navbar-brand">Welcome {props.user}</a>
            <a className="navbar-brand" href="landing" onClick={props.updateSignedIn}>Sign Out</a></div>;
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbar-left'>
                <i className="fab fa-wpexplorer"></i>
                <a className="navbar-brand" href="/">Vasco-Da-Gama</a>
            </div>
            <div className='navbar-right'>
                {navbarRight}
            </div>
        </nav>
    );
}
