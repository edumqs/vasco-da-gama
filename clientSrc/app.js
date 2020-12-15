import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing'
import Registration from './components/Registration'
import Login from './components/Login'
import Header from './components/Header'
import {Route, BrowserRouter as Router} from 'react-router-dom'

import './app.less';

ReactDOM.render(
    <Router>
        <Header/>
        <Route path='/' exact component={Landing}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/registration' component={Registration}></Route>
    </Router>,

    document.getElementById('app-container')
);