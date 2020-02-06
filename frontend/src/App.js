import React from 'react';
import './sass/default.scss';
import './sass/pages/Login.scss';
import Header from './containers/Header';
import Login from './pages/Login';


function App() {
  return (
    <div className="app">
      <Header />
      <Login />
    </div>
  );
}

export default App;
