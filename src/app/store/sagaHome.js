/**
 * Home首页saga
 * @date:2017-5-7
 */
import {put,call,} from 'redux-saga/effects';
import {
  getInitData
} from '../servers/homeServer';
import {
  fetchInitDataAction,
} from './storeHome';


//注册新用户
export default function *sagaHome() {
  try {
    const data = yield call(getInitData);
    yield put(fetchInitDataAction(data));
  } catch (e) {
    console.log(e);
  }
}