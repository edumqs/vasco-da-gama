import React from 'react';
import '../styles/Header.less';

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbar-left'>
                <i className="fab fa-wpexplorer"></i>
                <a className="navbar-brand" href="/">Vasco-Da-Gama</a>
            </div>
            <div className='navbar-right'>
                <a className="navbar-brand" href="login">Login</a>
                <a className="navbar-brand" href="registration">Register</a>
                <a className="navbar-brand" href="map">Map</a>
            </div>
        </nav>
    );
};

export default Header;
