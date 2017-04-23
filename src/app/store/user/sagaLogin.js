/**
 * user用户saga
 * date:2017-4-3
 */
import {
  LOGIN_START,
} from '../pub/type';
import {
  showMsgAction,
} from '../pub/actions';
import {
  loginSuccessAction,
  userFetchErrAction,
} from './actions';
import {destroyMsg} from '../pub/sagaPub';

import { takeLatest } from 'redux-saga';
import { call, put} from 'redux-saga/effects';
import { login } from '../../servers/user';
import { push } from 'react-router-redux';

//注册新用户
export default function *sagaLogin() {
  yield* takeLatest(LOGIN_START, function* loginTask(action) {
    yield put(showMsgAction({ msg: '登录中...', msgType: 'loading' }));
    
    try {
      const data = yield call(login, action.payload);
      yield put(loginSuccessAction(data));
      //yield put(showMsgAction({ msg: '登录成功！', msgType: 'success'}));
      yield call(destroyMsg,0);
      yield put(push('/user'));
    } catch (e) {
      yield put(userFetchErrAction());
      yield put(showMsgAction({ msg: e.message, msgType: 'error' }));
      yield call(destroyMsg);
    }
  });
}