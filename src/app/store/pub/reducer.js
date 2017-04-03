/**
 * msg信息reducer
 * date:2017-4-3
 */
import {
	CHANG_MSG,
} from './actions';

const initState={
	msg:'',//消息内容
};

export default (state = initState, action)=> {
	switch (action.type) {
		case CHANG_MSG:
			return {
				...state,
				msg:action.payload,
			};
		default:
			return state;
	}
};