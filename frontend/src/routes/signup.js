import React, { Component } from 'react';
import Nav from '../forms/nav'
import { Link } from 'react-router-dom';
import signupform from '../forms/signupform';


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

  render () {
    return (
      <div>
        <center>
          <h1> Bulletin </h1>

          <signupform
            onSubmit={this.submit}
            onChange={this.change}
            errors={this.state.errors}
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
