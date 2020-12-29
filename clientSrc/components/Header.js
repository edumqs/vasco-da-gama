import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.less';

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbar-left'>
                <i className="fab fa-wpexplorer"></i>
                <Link className="navbar-brand" to="/">Vasco-Da-Gama</Link>
            </div>
            <div className='navbar-right'>
                <Link className="navbar-brand" to="login">Login</Link>
                <Link className="navbar-brand" to="registration">Register</Link>
                <Link className="navbar-brand" to="map">Map</Link>
            </div>
        </nav>
    );
};

export default Header;
