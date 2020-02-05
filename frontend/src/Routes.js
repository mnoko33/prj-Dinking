import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from '/pages/Signup';

export default () => {
    return (
        <Router>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        </Router>
    )
    
}