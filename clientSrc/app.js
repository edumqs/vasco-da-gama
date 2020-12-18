import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Header from './components/Header.js';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import './app.less';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <Header/>
        <Route path='/' exact component={Landing}></Route>
        <Route path='/login' component={Login}></Route>
    </Router>,

    document.getElementById('app-container')
);