/**
 * app公共reducer
 * date:2017-4-3
 */
import {
  SHOW_MSG,
} from './type';

const initState = {
  msg: '',//消息内容
  duration:5,//消息默认显示时间
  isClosed: true,//是否已关闭
  msgType: 'info',//消息内容类型,info:一般;success:成功；error：出错；warning：警告；loading：加载中
};

export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_MSG:
      const {
        duration,
        msg,
        msgType,
      } = action.payload;
      return {
        ...state,
        duration,
        msg,
        msgType,
        isClosed: false,
      };
    
    default:
      return state;
  }
};