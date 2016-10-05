import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const counter = (state = 0, { type }) => {
  switch (type) {
    case 'INCREMENT':
      return state + 2;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const users = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_USERS':
      return payload;
    default:
      return state;
  }
}

const userDetail = (state = null, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_DETAIL':
      return payload;
    default:
      return state;
  }
}

export const fetchUsers = () => async dispatch => {
  const users = await fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json());
  dispatch({
    type: 'FETCH_USERS',
    payload: users
  });
}

export const fetchUserDetail = (id) => async dispatch => {
  const user = await fetch(`http://jsonplaceholder.typicode.com/users/${id}`).then(response => response.json());
  dispatch({
    type: 'FETCH_USER_DETAIL',
    payload: user
  });
}

const combinedReducers = combineReducers({
  counter,
  users,
  userDetail,
  routing,
});

export default combinedReducers;
