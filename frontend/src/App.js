import React, { Component } from 'react';
import './sass/default.scss';
import './sass/pages/Login.scss';
import './sass/pages/Signup.scss';
import './sass/pages/Page404.scss';
import './sass/pages/Mypage.scss';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Password from './pages/Password';
import NotFound from './pages/NotFound';
import Mypage from './pages/Mypage';
import { login } from './modules/auth';
import { connect } from 'react-redux';

// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';

class App extends Component {
    initializeUser = async () => {
      const userInfo = await localStorage.getItem('userInfo');
      if (!userInfo) return;
      await this.props.login(JSON.parse(userInfo))
    }

    componentDidMount() {
      this.initializeUser();
    }

    render() {
      return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/password" component={Password} />
            <Route path="/" component={Mypage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(
  null,
  dispatch => ({
      login: (user) => dispatch(login(user))
  })
)(App);
