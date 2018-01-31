import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import home from './routes/home';
import signup from './routes/signup';
import login from './routes/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={home}/>
          <Route path="/signup" component={signup}/>
          <Route path="/login" component={login}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
