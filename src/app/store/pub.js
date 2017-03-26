/**
 * msg信息提示逻辑
 * date:2017-3-19
 */

/*1.types********************************************************************************/
const CHANG_MSG='CHANG_MSG';


/*2.reducer********************************************************************************/
const initState={
	msg:''//消息内容
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



/*3.actions********************************************************************************/
let timer=null;
const changeMsgAction = payload=>({ type: CHANG_MSG,payload});


//定时隐藏消息，默认5秒后自动隐藏
/*export const autoHideMsgAction = (msg,time=5000)=> dispatch=> {
	dispatch(changeMsgAction(msg));
	
	//过发time时间后自动隐藏
	if (!timer) {
		clearTimeout(timer);
		timer=setTimeout(()=>dispatch(changeMsgAction('')),time);
	}
};*/

/*4.saga********************************************************************************/
import { call, put } from 'redux-saga/effects';
import {delay} from '../../lib/Utils';

//显示提示信息，默认5秒后自动隐藏
export function *showMsgTake(msg,time=5000) {
	yield put(changeMsgAction(msg));
	
	//过发time时间后自动隐藏
	yield delay(time);
	yield put(changeMsgAction(''));
}