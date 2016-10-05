import React from 'react';
import { connect } from 'react-redux';

const Users = ({ users }) => (
  <div>
    <h1>Users list</h1>
    <ul>
      {users.map(user => (
        <li>{user.name.first}</li>
      ))}
    </ul>
  </div>
);

export default connect(
  state => ({
    users: state.users
  })
)(Users);
