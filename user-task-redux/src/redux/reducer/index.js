import { combineReducers } from 'redux';
import taskReducer from './task';
import userReducer from './user';
import loadingReducer from './loading';

export default combineReducers({
	userReducer,
	taskReducer,
	loadingReducer,
});