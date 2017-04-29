/**
 * 用户注册组件
 * date:2017-3-11
 */
import { connect } from 'react-redux';
import './index.less';
import {
  startLoginAction,
} from '../store/user';
import Msg from '../ui/Msg';
import LoginBox from './ui/LoginBox';
import Footer from '../ui/Footer';

export default connect(({userState}) => ({
  userState,
}), {
  startLoginAction,
})(({ startLoginAction}) => {
  
  return (
      <div className={'r-page'}>
        <Msg/>
  
        <LoginBox action={startLoginAction} type="login"/>
        
        <Footer/>
      </div>);
});