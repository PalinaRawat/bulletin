import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class nav extends Component {
  render() {
    return(
      <div className="Nav">
        <div className="Nav-Container">
          <Link to="/">
            <img src={logo}/>
          </Link>
        </div>
      </div>
    );
  }
}

export default nav;
