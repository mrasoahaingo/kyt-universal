import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { provideHooks } from 'redial';
import { fetchUserDetail } from '../../store/reducers';

const UserDetail = ({ userDetail }) => (
  <div>
    <h1>{userDetail && userDetail.name}</h1>
  </div>
);

const hooks = {
  fetch: ({ params, dispatch }) => dispatch(fetchUserDetail(params.id))
};

const mapStateToProps = state => ({
  userDetail: state.userDetail
});

export default provideHooks(hooks)(connect(mapStateToProps)(UserDetail));
