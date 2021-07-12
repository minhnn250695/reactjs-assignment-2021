import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import reducer from '../redux/reducer';
import { fetchToSaga, updateToSaga } from '../redux/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

function* combineSaga() {
  yield all([
    call(fetchToSaga),
    call(updateToSaga)
  ]);
}

sagaMiddleware.run(combineSaga);

export default store;
