//统一导出reducers与saga
import {logSaga} from './sagaLog';
import pub from './pub';
import user, { regSaga } from './user';

export {
	logSaga,
	regSaga,
};

export default {
	pub,
	user,
};