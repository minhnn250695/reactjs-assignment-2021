import { combineReducers } from 'redux';
import user from './user';
import task from './task';
import loading from './loading';

const appReducer = combineReducers({
  user,
  task,
  loading
})

export default appReducer