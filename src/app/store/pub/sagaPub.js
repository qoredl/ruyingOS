/**
 * 公共saga-app共用
 * date:2017-3-26
 */
import {
  destroyMsgAction,
} from '../pub/actions';
import { take,call,put } from 'redux-saga/effects';
import {delay} from '../../../lib/Utils';

export function *destroyMsg(delayTime=5000) {
  yield call(delay,delayTime);
  yield put(destroyMsgAction());
}



//打印日记
export default function *sagaPub(getState) {
  while (true) {
    const action = yield take('*');
  
    //saga监听action并打印日记-app共用
    console.group(action.type);
    console.info('dispatching action:', action);
    console.log('state:', getState());
    console.groupEnd(action.type);
  }
}