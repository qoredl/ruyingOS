/**
 * user用户saga
 * @date:2017-4-3
 */
import {
  showMsgAction,
  destroyMsgAction,
} from './pubStore';
import {
  START_REG,
  fetchUserSuccessAction,
} from './userStore';

import { takeLatest,delay } from 'redux-saga';
import { call, put} from 'redux-saga/effects';
import { addUser } from '../servers/userServer';
import { push } from 'react-router-redux';


//注册新用户
export default function *regSaga() {
  yield* takeLatest(START_REG, function* signTask(action) {
    
    yield put(showMsgAction({ msg: '注册用户中...', msgType: 'loading' }));
    
    try {
      const data = yield call(addUser, action.payload);
      yield put(fetchUserSuccessAction(data));
      yield put(destroyMsgAction());
      yield put(push('/user'));
    } catch (e) {
      yield put(showMsgAction({ msg: `注册失败！(${e.message})`, msgType: 'error' }));
      yield delay(3000);
      yield put(destroyMsgAction());
    }
  });
}