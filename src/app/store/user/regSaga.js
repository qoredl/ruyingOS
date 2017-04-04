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

import showMsgSaga from '../pub/showMsgSaga';
import { takeLatest } from 'redux-saga';
import { call, put, fork, cancel, } from 'redux-saga/effects';
import { fetch, } from '../../../lib/Utils';
import { server } from '../../config/index';

const { headers, baseUrl } = server;

//注册新用户
export default function *regSaga() {
	yield* takeLatest(USER_FETCH_START, function* signTask(action) {
		let take = yield fork(showMsgSaga, {msg:'注册用户中...',msgType:'loading'});
		
		try {
			const data = yield call(fetch, baseUrl + '_User', {
				headers,
				method: 'post',
				body: JSON.stringify(action.payload)
			});
			
			yield put(signSuccessAction({ payload: data }));
			yield cancel(take);
			take = yield fork(showMsgSaga, {msg:'注册用户成功！请登录。',msgType:'success'});
		} catch (e) {
			yield put(userFetchErrAction());
			yield cancel(take);
			yield fork(showMsgSaga, {msg:e.message,msgType:'error'});
		}
	});
}