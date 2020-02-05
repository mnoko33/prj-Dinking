import React from 'react';
import './sass/SassComponent.scss';
import Header from './components/Header';
import Login from './Container/Login';

function App() {
  return (
    <div className="app">
      <Header />
      <Login />
    </div>
  );
}

export default App;
