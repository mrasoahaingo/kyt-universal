import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { provideHooks } from 'redial';
import { fetchUsers } from '../../store/reducers';

const UserList = ({ users }) => (
  <div>
    <h1>Users list</h1>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const hooks = {
  fetch: ({ dispatch }) => dispatch(fetchUsers())
};

const mapStateToProps = state => ({
  users: state.users
});

export default provideHooks(hooks)(connect(mapStateToProps)(UserList));
