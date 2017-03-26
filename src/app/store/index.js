//统一导出reducers与saga
import {logSaga} from './sagaLog';
import pub from './pub';
import user, { signSaga } from './user';

export const saga = [
	logSaga,
	signSaga,
];

export default {
	pub,
	user,
};