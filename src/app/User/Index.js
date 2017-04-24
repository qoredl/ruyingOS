/**
 * User模块入口容器组件
 * date:2017-1-15
 */
import { connect } from 'react-redux';
import './index.less';
import Footer from '../ui/Footer';

export default connect(({ routing, pubState, userState }) => ({
  routing,
  pubState,
  userState,
}), {
  //actionCreater
})(props => {
  //使用replaceReducer按需加载reducer时第一次渲染组件时对应state为空
  if (!props.userState) return null;
  
  //解构用到的props
  const {
    userState: {
      token,
      userInfo: { username },
    },
  } = props;
  
  return (
      <div className={'r-page'}>
        
        <div className={'r-wrap'}>
          {token ? <h2>{`您好！${username}`}</h2>
              : <div style={{ 'textAlign': 'center' }}>
                <h4>您尚未登录，请先<a href="#login">登录</a>！</h4>
                或<a href="#reg">注册新用户</a></div>}
        </div>
        
        <Footer/>
      </div>);
});