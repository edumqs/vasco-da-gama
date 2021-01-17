import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';

ReactDOM.render(
    <Router>
        <Routes/>
    </Router>,
    document.getElementById('app-container')
);
