import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Registration from './Registration';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import Map from './Map';
import APIEndpoints from '../api';
import '../app.less';

const Routes = () => {
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')) || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');

    const updateSignedIn = (username) => {
        if (signedIn === false) {
            setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
            setUser(username, localStorage.setItem('user', JSON.stringify(username)));
        } else {
            localStorage.clear();
            axios.post(APIEndpoints.logout, { withCredentials: true });
        }
    };

    return (
        <div>
            <Header
                user={user}
                signedIn={signedIn}
                updateSignedIn={updateSignedIn}/>
            <Route exact path='/' render={props => <Landing {...props}
                signedIn={signedIn}
            />}></Route>
            <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
            />}></Route>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/profile' render={props => <Profile {...props}
                user={user}
            />}></Route>
            <Route path='/map' component={Map}></Route>
        </div>
    );
};

export default Routes;
