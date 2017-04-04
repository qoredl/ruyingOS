/**
 * user用户saga
 * date:2017-4-3
 */
import {
	USER_FETCH_START,
	signSuccessAction,
	userFetchErrAction,
} from './actions';

import { takeLatest } from 'redux-saga';
import { call, put, fork, cancel, } from 'redux-saga/effects';
import { fetch, } from '../../../lib/Utils';
import { server } from '../../config/index';

const { headers, baseUrl } = server;

//注册新用户
export default function *regSaga() {
	yield* takeLatest(USER_FETCH_START, function* signTask(action) {
		try {
			const data = yield call(fetch, baseUrl + '_User', {
				headers,
				method: 'post',
				body: JSON.stringify(action.payload)
			});
			
			yield put(signSuccessAction({ payload: data }));
		} catch (e) {
			yield put(userFetchErrAction());
		}
	});
}