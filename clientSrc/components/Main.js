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
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')) || '');
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')) || '');
    // const [checkedIn, setCheckedIn] = useState(false);
    const [checkedInLocation, setCheckedInLocation] = useState(JSON.parse(localStorage.getItem(
        'checkedInLocation'
    )) || '');
    // const [checkedInDuration, setCheckedInDuration] = useState('0:00');

    const updateSignedIn = () => {
        // eslint-disable-next-line no-const-assign
        if (signedIn === false) {
            setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
        } else {
            localStorage.clear();
        }
    };

    const retrieveUserData = () => {
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                const user = res.data;
                setUsername(user.username, localStorage.setItem('username', JSON.stringify(user.username)));
                setEmail(user.email, localStorage.setItem('email', JSON.stringify(user.email)));
                setCheckedInLocation(user.address.city, localStorage.setItem(
                    'checkedInLocation', JSON.stringify(user.address.city)
                ));
                updateSignedIn();
            });
    };

    return (
        <Router>
            <Header
                username={username}
                signedIn={signedIn}
                updateSignedIn={updateSignedIn}/>
            <Route path='/' exact component={Landing}></Route>
            <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
                retrieveUserData={retrieveUserData}
            />}/>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/profile' render={props => <Profile {...props}
                username={username}
                email={email}
                checkedInLocation={checkedInLocation}
            />}></Route>
        </Router>
    );
};

export default Main;
