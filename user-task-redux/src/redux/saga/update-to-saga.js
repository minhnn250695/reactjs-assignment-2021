import { createUserAPI, deleteUserAPI, updateUserAPI } from '../../services/user';
import { createTaskAPI, deleteTaskAPI, updateTaskAPI } from '../../services/task';
import ActionTypes  from '../action/actionTypes';
import { call,all, put, takeEvery } from 'redux-saga/effects';

function* addUser(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(createUserAPI, action.payload);
    yield put({ type: ActionTypes.ADD_USER_SUCCESS, payload: res.data });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}

function* updateUser(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(updateUserAPI, action.payload);
    yield put({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: res.data });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}

function* deleteUser(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    yield call(deleteUserAPI, action.payload);
    yield put({ type: ActionTypes.DELETE_USER_SUCCESS, payload: action.payload });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}


function* addTask(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(createTaskAPI, action.payload);
    yield put({ type: ActionTypes.ADD_TASK_SUCCESS, payload: res.data });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}

function* updateTask(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(updateTaskAPI, action.payload);
    yield put({ type: ActionTypes.UPDATE_TASK_SUCCESS, payload: res.data });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}

function* deleteTask(action) {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    yield call(deleteTaskAPI, action.payload);
    yield put({ type: ActionTypes.DELETE_TASK_SUCCESS, payload: action.payload });
    yield put({ type: ActionTypes.END_LOADING });
  } catch (error) {
  }
}

function* updateToSaga() {
  yield all([
    takeEvery(ActionTypes.ADD_USER, addUser),
    takeEvery(ActionTypes.UPDATE_USER, updateUser),
    takeEvery(ActionTypes.DELETE_USER, deleteUser),

    takeEvery(ActionTypes.ADD_TASK, addTask),
    takeEvery(ActionTypes.UPDATE_TASK, updateTask),
    takeEvery(ActionTypes.DELETE_TASK, deleteTask)
  ]);
}

export default updateToSaga;
