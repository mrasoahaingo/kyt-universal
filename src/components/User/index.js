import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { provideHooks } from 'redial';
import { fetchUserDetail, fetchUsers } from '../../store/reducers';
import UserList from './list';

const UserDetail = ({ userDetail }) => (
  <div>
    <div style={{ float: 'right', width: 200 }}>
      <UserList/>
    </div>
    <h1>{userDetail && userDetail.name}</h1>
  </div>
);

const hooks = {
  fetch: ({ params, dispatch }) => Promise.all([
    dispatch(fetchUsers()),
    dispatch(fetchUserDetail(params.id))
  ])
};

const mapStateToProps = state => ({
  userDetail: state.userDetail
});

export default provideHooks(hooks)(connect(mapStateToProps)(UserDetail));
