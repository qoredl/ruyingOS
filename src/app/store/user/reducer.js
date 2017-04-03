/**
 * user用户reducer
 * date:2017-4-3
 */
import {
	USER_FETCH_START,
	REG_SUCCESS,
	USER_FETCH_ERROR,
	CHANG_USERINFO,
} from './actions';

const initState = {
	isFetching: false,//获取数据操作是否正在运行中
	isLogin: false,//是否已登录
	
	//用户信息
	userInfo: {
		username: '',
		password: ''
	},
};
export default (state = initState, action) => {
	switch (action.type) {
		case USER_FETCH_START:
			return {
				...state,
				isFetching: true,
			};
		case REG_SUCCESS:
			return {
				...state,
				isFetching: false,
				token: action.payload.sessionToken,
			};
		case USER_FETCH_ERROR:
			return {
				...state,
				isFetching: false
			};
		case CHANG_USERINFO:
			return {
				...state,
				userInfo: action.payload,
			};
		default:
			return state;
	}
};