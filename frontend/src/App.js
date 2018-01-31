import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './routes/signup'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bulletin</h1>
        </header>
        <p className="App-intro">
          There is nothing here because frontend is the worst.
        </p>
      </div>
    );
  }
}

export default App;
