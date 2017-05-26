/**
 * User模块入口容器组件
 * @date:2017-1-15
 */
import { connect } from 'react-redux';
import Footer from '../ui/Footer';
import Me from './ui/Me';
import '../ui/less/app.less';
import './less/index.less';

export default connect(({ userState }) => ({ userState}), {
  //regAction
})(({
      userState: {
        token,
        userInfo: { username },
      },
      location,
      param,
    }) => {
  
  console.log('location:',location, 'param:',param);
  
  const userData={username};
  
  return <div className={'r-page'}>
    <div className={'r-wrap'}>
      {token ? <Me {...userData}/>
          : <div style={{ 'textAlign': 'center' }}>
            <h4>您尚未登录，请先<a href="#login">登录</a>！</h4>
            或<a href="#reg">注册新用户</a></div>}
    </div>
    <Footer/>
  </div>;
});