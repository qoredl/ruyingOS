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
  signSuccessAction,
  userFetchErrAction,
} from './actions';

import { takeLatest } from 'redux-saga';
import { call, put} from 'redux-saga/effects';
import { addUser } from '../../servers/user';
import { push } from 'react-router-redux';

//注册新用户
export default function *sagaReg() {
  yield* takeLatest(USER_FETCH_START, function* signTask(action) {
    yield put(showMsgAction({ msg: '注册用户中...', msgType: 'loading' }));
    
    try {
      const data = yield call(addUser, action.payload);
      yield put(signSuccessAction(data));
      yield put(showMsgAction({ msg: '注册用户成功！', msgType: 'success' }));
      yield put(push('/user'));
    } catch (e) {
      yield put(userFetchErrAction());
      yield put(showMsgAction({ msg: `注册失败！(${e.message})`, msgType: 'error' }));
    }
  });
}