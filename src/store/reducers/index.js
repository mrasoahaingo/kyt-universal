import { combineReducers } from 'redux';

const counter = (state = 0, { type, payload }) => {
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
    case 'ADD_USERS':
      return [...state, payload];
    default:
      return state;
  }
}

const combinedReducers = combineReducers({
  counter,
  users
});

export default combinedReducers;
