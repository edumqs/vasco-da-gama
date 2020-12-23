import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Registration from './Registration';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import '../app.less';

const Main = () => {
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')) || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    const updateSignedIn = () => {
        if (signedIn === false) {
            setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
        } else {
            localStorage.clear();
        }
    };

    const retrieveUserData = () => {
        // This will send a .get request to the backend instead of to JSON placeholder
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                setUser(res.data, localStorage.setItem('user', JSON.stringify(res.data)));
                updateSignedIn();
            });
    };

    return (
        <Router>
            <Header
                user={user}
                signedIn={signedIn}
                updateSignedIn={updateSignedIn}/>
            <Route path='/' exact component={Landing}></Route>
            <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
                retrieveUserData={retrieveUserData}
            />}/>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/profile' render={props => <Profile {...props}
                user={user}
            />}></Route>
        </Router>
    );
};

export default Main;
