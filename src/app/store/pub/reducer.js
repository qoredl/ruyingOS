/**
 * msg信息reducer
 * date:2017-4-3
 */
import {
	CHANG_MSG,
} from './type';

const initState={
	msg:'',//消息内容
	msgType:'info',//消息内容类型,info:一般;success:成功；error：出错；warning：警告；loading：加载中
};

export default (state = initState, action)=> {
	switch (action.type) {
		case CHANG_MSG:
			return {
				...state,
				msg:action.payload.msg,
				msgType:action.payload.msgType,
			};
		default:
			return state;
	}
};