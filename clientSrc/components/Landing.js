import React from 'react';
import '../styles/Landing.less';

export default function Landing() {
    return (
        <div className='landing-container'>
            <div className='landing-blurb'>
                <h2>“Vasco da Gama” - Explore the world and meet others in your vicinity!</h2>
            </div>
            <a className='registration-button btn btn-primary' href='registration'>Register</a>
        </div>
    );
}
