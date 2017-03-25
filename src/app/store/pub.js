/**
 * @msg信息提示逻辑
 * @date:2017-3-19
 * update:2017-3-19
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
const changeMsgAction = (payload)=>({ type: CHANG_MSG,payload});


//定时隐藏消息，默认5秒后自动隐藏
export const autoHideMsgAction = (msg,time=5000)=> (dispatch)=> {
	dispatch(changeMsgAction(msg));
	
	//过发time时间后自动隐藏
	if (!timer) {
		clearTimeout(timer);
		timer=setTimeout(function () {
			dispatch(changeMsgAction(''));
		},time);
	}
};