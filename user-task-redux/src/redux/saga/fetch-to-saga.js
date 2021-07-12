import { call, all, put, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../action/actionTypes';
import { fetchUsersAPI } from '../../services/user';
import { fetchTasksAPI } from '../../services/task';
import { isExpiredToken } from '../../auth/authentication';

function* fetchUsers() {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(fetchUsersAPI);
    yield put({ type: ActionTypes.FETCH_USERS_SUCCESS, payload: res.data });

    const isExpired = yield call(isExpiredToken);
    if (isExpired) {
      yield put({ type: ActionTypes.EXPIRED_TOKEN })
    } else {
      yield put({ type: ActionTypes.END_LOADING });
    }
  } catch (error) {
  }
}

function* fetchTasks() {
  yield put({ type: ActionTypes.START_LOADING });
  try {
    const res = yield call(fetchTasksAPI);
    yield put({ type: ActionTypes.FETCH_TASKS_SUCCESS, payload: res.data });

    const isExpired = yield call(isExpiredToken);
    if (isExpired) {
      yield put({ type: ActionTypes.EXPIRED_TOKEN })
    } else {
      yield put({ type: ActionTypes.END_LOADING });
    }
  } catch (error) {
  }
}

function* fetchToSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_USERS_DATA, fetchUsers),
    takeEvery(ActionTypes.FETCH_TASKS_DATA, fetchTasks)
  ]);
}

export default fetchToSaga;