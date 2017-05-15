/**
 * 全局消息组件
 * date:2017-4-29
 */
import { connect } from 'react-redux';

export default connect(({pubState}) => ({ pubState}))(({
      pubState: {
        msg,
        msgDuration,
        msgType,
      },
    }) => {
  
  return <div className={msg&&'r-msg'}>{msg}</div>;
});