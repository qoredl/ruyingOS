/**
 * Home首页saga
 * @date:2017-5-7
 */
import {
  fetchDataAction,
  addDataAction,
} from './storeHome';

import {put,call,} from 'redux-saga/effects';
import {
  addData,
  getData
} from '../servers/homeServer';


//注册新用户
export default function *sagaHome() {
  try {
    const data = yield call(getData);
    yield put(fetchDataAction(data));
  } catch (e) {
    console.log(e);
  }
}