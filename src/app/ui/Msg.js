/**
 * 全局消息组件
 * date:2017-4-29
 */
import { connect } from 'react-redux';
import { message} from 'antd';

export default connect(({pubState}) => ({ pubState}))(({
      pubState: {
        msg,
        msgDuration,
        msgType,
      },
    }) => {
  
  message.config({ duration: msgDuration });
  message.destroy();
  msg && message[msgType](msg);
  
  return null;
});