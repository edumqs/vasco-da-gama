import React from 'react'

const Header = () => {
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbarLeft'>
                <i class="fab fa-wpexplorer"></i>
                <a className="navbar-brand" href="/">Vasco-Da-Gama</a>
            </div>
            <div className='navbarRight'>
                <a className="navbar-brand" href="login">Login</a>
                <a className="navbar-brand" href="registration">Register</a>
            </div>
        </nav>
    )
}

export default Header