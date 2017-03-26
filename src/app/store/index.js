//统一导出reducers与saga
import {logSaga} from './log';
import pub from './pub';
import user, { userSaga } from './user';

export const saga = [
	logSaga,
	userSaga,
];

export default {
	pub,
	user,
};