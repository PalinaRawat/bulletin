import React, { Component } from 'react';
import Nav from '../forms/nav'
import { Link } from 'react-router-dom';
import { GET, POST } from '../tools/api'
import SignupForm from '../forms/signupform';


class signup extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {
        name:'',
        email:'',
        password:''
      }
    }
  }

  change = (e) => {
    switch (e.target.name) {
      case "name": this.setState({ user: {name: e.target.value}}); break;
      case "email": this.setState({ user: {email: e.target.value }}); break;
      case "password": this.setState({ user: {password: e.target.value }}); break;
    };
  }

  submit = (e) => {
    var response = POST(this.state.user);
    console.log(response);
  }

  render () {
    return (
      <div>
        <center>
          <h1> Bulletin </h1>

          <SignupForm
            onSubmit={this.submit}
            onChange={this.change}
            user={this.state.user}
          />

          <p1> Already have an account? </p1> <br/>
          <Link to="/login"><button> sign in </button></Link>
        </center>
      </div>
    );
  }
}

export default signup;
