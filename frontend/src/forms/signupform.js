import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const signupform = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <input
        floatingLabelText="Name"
        name="name"
        errorText={errors.name}
        onChange={onChange}
        value={user.name}
      />
      <input
        floatingLabelText="Email"
        name="email"
        errorText={errors.email}
        onChange={onChange}
        value={user.email}
      />
      <input
        floatingLabelText="Password"
        name="password"
        errorText={errors.password}
        onChange={onChange}
        value={user.password}
      />
    </form>
  </div>
);

export default signupform;
