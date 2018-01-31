import React, { Component } from 'react';
import Nav from '../forms/nav'
import { Link } from 'react-router-dom';

class home extends Component {
  render () {
    return (
      <div>
        <center>
          <h1> Bulletin </h1>
          <Link to="/signup"><button> sign up </button></Link>
          <Link to="/login"><button> sign in </button></Link>
        </center>
      </div>
    );
  }
}

export default home;
