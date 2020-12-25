import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/Landing';
import Registration from './components/Registration';
import Login from './components/Login';
import Map from './components/Map';
import Header from './components/Header';

import './app.less';

ReactDOM.render(
    <Router>
        <Header/>
        <Route path='/' exact component={Landing}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/registration' component={Registration}></Route>
        <Route path='/map' component={Map}></Route>
    </Router>,

    document.getElementById('app-container')
);
