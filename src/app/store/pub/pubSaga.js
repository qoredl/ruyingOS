/**
 * 公共saga-app共用
 * date:2017-3-26
 */
import {
  destroyMsgAction,
} from '../pub/actions';
import {delay} from 'redux-saga';
import { take,put,} from 'redux-saga/effects';

export function *destroyMsg(delayTime=3000) {
  yield delay(delayTime);
  yield put(destroyMsgAction());
}



//打印日记
export function *logSaga(getState) {
  while (true) {
    const action = yield take('*');
  
    //saga监听action并打印日记-app共用
    console.group(action.type);
    console.info('dispatching action:', action);
    console.log('state:', getState());
    console.groupEnd(action.type);
  }
}