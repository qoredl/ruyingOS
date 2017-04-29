/**
 * app公共reducer
 * @date:2017-4-3
 */
import {guid} from '../../lib/utils'

/**
 * 1.type***************************************************************
 * @type {string}
 */
export const SHOW_MSG='SHOW_MSG'+guid();
export const DESTROY_MSG='DESTROY_MSG'+guid();

/**2.action***************************************************************
 * @param payload
 */
//展示全局消息
export const showMsgAction = payload=>({ type: SHOW_MSG,payload});
//隐藏全局消息
export const destroyMsgAction = ()=>({ type: DESTROY_MSG});


/**3.reducer***************************************************************
 * @param payload
 */
const initState = {
  msgType: 'info',//消息内容类型,info:一般;success:成功；error：出错；warning：警告；loading：加载中
  msg: '',//消息内容
  msgDuration:4,//全局信息显示时间，单位:秒
};

export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_MSG:
      const {
        msg,
        msgType,
      } = action.payload;
      return {
        ...state,
        msg,
        msgType,
      };
  
    case DESTROY_MSG:
      return {
        ...state,
        msg:'',
      };
    
    default:
      return state;
  }
};