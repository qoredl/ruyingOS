/**
 * user用户saga
 * date:2017-4-3
 */
import {
  USER_FETCH_START,
} from '../pub/type';
import {
  signSuccessAction,
  userFetchErrAction,
} from './actions';

import sagaShowMsg from '../pub/sagaShowMsg';
import { takeLatest } from 'redux-saga';
import { call, put, fork, cancel, } from 'redux-saga/effects';
import { addUser } from '../../servers/user';
import { push } from 'react-router-redux';

//注册新用户
export default function *sagaReg() {
  yield* takeLatest(USER_FETCH_START, function* signTask(action) {
    let take = yield fork(sagaShowMsg, { msg: '注册用户中...', msgType: 'loading' });
    
    try {
      const data = yield call(addUser, action.payload);
      yield put(signSuccessAction(data));
      yield cancel(take);
      take = yield fork(sagaShowMsg, { msg: '注册用户成功,已自动跳转到用户中心！', msgType: 'success' });
      yield put(push('/user'));
    } catch (e) {
      yield put(userFetchErrAction());
      yield cancel(take);
      yield fork(sagaShowMsg, { msg: e.message, msgType: 'error' });
    }
  });
}