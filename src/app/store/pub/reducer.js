/**
 * app公共reducer
 * @date:2017-4-3
 */
import {
  SHOW_MSG,
  DESTROY_MSG,
} from './type';

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