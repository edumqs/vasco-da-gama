import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Registration from './Registration';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import Map from './Map';
import '../app.less';

const Routes = () => {
    const history = useHistory();
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')) || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    const updateSignedIn = () => {
        if (signedIn === false) {
            setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
        } else {
            localStorage.clear();
        }
    };

    const retrieveUserData = (requestedUserSignIn) => {
        // This will send a .get request to the backend instead of to JSON placeholder
        axios.get(`https://jsonplaceholder.typicode.com/users/${requestedUserSignIn}`)
            .then((res) => {
                setUser(res.data, localStorage.setItem('user', JSON.stringify(res.data)));
                updateSignedIn();
                redirectToMapAfterSigningIn();
            });
    };

    const redirectToMapAfterSigningIn = () => {
        history.push('./map');
    };

    // const redirectToLoginPageAfterRegistering = () => {
    //     history.push('./login');
    // };

    return (
        <div>
            <Header
                user={user}
                signedIn={signedIn}
                updateSignedIn={updateSignedIn}/>
            <Route path='/' exact component={Landing}></Route>
            <Route path='/login' render={props => <Login {...props}
                retrieveUserData={retrieveUserData}
            />}/>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/profile' render={props => <Profile {...props}
                user={user}
            />}></Route>
            <Route path='/map' component={Map}></Route>
        </div>
    );
};

export default Routes;
