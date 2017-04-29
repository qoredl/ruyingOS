/**
 * user用户saga
 * @date:2017-4-3
 */
import {
  showMsgAction,
  destroyMsgAction,
} from './pub';
import {
  START_LOGIN,
  loginSuccessAction,
  fetchUserErrAction,
} from './user';

import { takeLatest, delay, } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { login } from '../servers/user';
import { push } from 'react-router-redux';

//注册新用户
export default function *loginSaga() {
  yield* takeLatest(START_LOGIN, function* loginTask(action) {
    yield put(showMsgAction({ msg: '登录中...', msgType: 'loading' }));
    
    try {
      const data = yield call(login, action.payload);
      yield put(loginSuccessAction(data));
      yield put(destroyMsgAction());
      yield put(push('/user'));
    } catch (e) {
      yield put(fetchUserErrAction());
      yield put(showMsgAction({ msg: e.message, msgType: 'error' }));
      yield delay(3000);
      yield put(destroyMsgAction());
    }
  });
}