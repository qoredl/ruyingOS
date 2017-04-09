/**
 * saga监听action并打印日记-app共用
 * date:2017-3-26
 */
import { take } from 'redux-saga/effects';

export default function *logSaga(getState) {
	while (true) {
		const action = yield take('*');
		
		console.group(action.type);
		console.info('dispatching action:', action);
		console.log('state:', getState());
		console.groupEnd(action.type);
	}
}