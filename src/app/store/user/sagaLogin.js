/**
 * user用户saga
 * date:2017-4-3
 */
import {
  USER_FETCH_START,
} from '../pub/type';
import {
  showMsgAction,
} from '../pub/actions';
import {
  loginSuccessAction,
  userFetchErrAction,
} from './actions';

import { takeLatest } from 'redux-saga';
import { call, put} from 'redux-saga/effects';
import { login } from '../../servers/user';
import { push } from 'react-router-redux';

//注册新用户
export default function *sagaLogin() {
  yield* takeLatest(USER_FETCH_START, function* signTask(action) {
    yield put(showMsgAction({ msg: '登录中...', msgType: 'loading' }));
    
    try {
      const data = yield call(login, action.payload);
      yield put(loginSuccessAction(data));
      yield put(showMsgAction({ msg: '登录成功,已自动跳转到用户中心！', msgType: 'success'}));
      yield put(push('/user'));
    } catch (e) {
      yield put(userFetchErrAction());
      yield put(showMsgAction, { msg: e.message, msgType: 'error' });
    }
  });
}