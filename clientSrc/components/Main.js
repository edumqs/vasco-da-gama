import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './Landing';
import Registration from './Registration';
import Login from './Login';
import Header from './Header';
import Profile from './Profile';
import '../app.less';

const Main = () => {
    const [signedIn, setSignedIn] = useState(false);

    const updateSignedIn = () => {
        if (signedIn) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
        }
    };

    return (
        <Router>
            <Header signedIn={signedIn} updateSignedIn={updateSignedIn}/>
            <Route path='/' exact component={Landing}></Route>
            <Route path='/login' render={props => <Login {...props} updateSignedIn={updateSignedIn}/>}/>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/profile' component={Profile}></Route>
        </Router>
    );
};

export default Main;
