import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div className="container">

    <form action="/" onSubmit={onSubmit}>
      <div className="info-form">
        <p1>Email</p1> <br/>
        <input
          floatingLabelText="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        /> <br/>

        <p1>Password</p1> <br/>
        <input
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        /> <br/>

        <button onClick={onSubmit}>register</button>
        <br/><br/>
      </div>
    </form>
  </div>
);

export default LoginForm;
