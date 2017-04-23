/**
 * user用户saga
 * date:2017-4-3
 */
import {
  REG_START,
} from '../pub/type';
import {
  showMsgAction,
} from '../pub/actions';
import {
  signSuccessAction,
  userFetchErrAction,
} from './actions';
import {destroyMsg} from '../pub/sagaPub';

import { takeLatest } from 'redux-saga';
import { call, put} from 'redux-saga/effects';
import { addUser } from '../../servers/user';
import { push } from 'react-router-redux';


//注册新用户
export default function *sagaReg() {
  yield* takeLatest(REG_START, function* signTask(action) {
    yield put(showMsgAction({ msg: '注册用户中...', msgType: 'loading' }));
    
    try {
      const data = yield call(addUser, action.payload);
      yield put(signSuccessAction(data));
      //yield put(showMsgAction({ msg: '注册用户成功！请登录！', msgType: 'success' }));
      yield call(destroyMsg,0);
      yield put(push('/user'));
    } catch (e) {
      yield put(userFetchErrAction());
      yield put(showMsgAction({ msg: `注册失败！(${e.message})`, msgType: 'error' }));
      yield call(destroyMsg);
    }
  });
}