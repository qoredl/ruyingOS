/**
 * msg信息saga
 * date:2017-4-3
 */
import {
	changeMsgAction,
} from './actions';

import {put } from 'redux-saga/effects';
import {delay} from '../../../lib/Utils';

//显示提示信息，默认5秒后自动隐藏
export default function *showMsgSaga({msg, msgType},time=5000) {
	yield put(changeMsgAction({msg,msgType}));
	
	//过发time时间后自动隐藏
	yield delay(time);
	yield put(changeMsgAction({msg:'',msgType}));
}