import React from 'react';
import './sass/default.scss';
import './sass/pages/Login.scss';
import './sass/pages/Signup.scss';
import './sass/pages/Page404.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Password from './pages/Password';
import NotFound from './pages/NotFound';

// eslint-disable-next-line
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/password" component={Password} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
}

export default App;
