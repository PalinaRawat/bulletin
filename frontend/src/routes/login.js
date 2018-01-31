import React, { Component } from 'react';
import Nav from '../forms/nav'
import { Link } from 'react-router-dom';
import LoginForm from '../forms/loginform';

class login extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {
        email: '',
        password: ''
      }
    }
  }

  change = (e) => {
    switch (e.target.name) {
      case "email": this.setState({ user: {email: e.target.value }}); break;
      case "password": this.setState({ user: {password: e.target.value }}); break;
    };
  }

  submit = (e) => {
    
  }

  render () {
    return (
      <div>
        <center>
          <h1> Bulletin </h1>

          <LoginForm
            onSubmit={this.submit}
            onChange={this.change}
            user={this.state.user}
          />

          <p1> Dont have an account? </p1> <br/>
          <Link to="/signup"><button> sign up </button></Link>
        </center>
      </div>
    );
  }
}

export default login;
