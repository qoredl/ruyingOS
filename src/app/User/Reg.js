/**
 * 用户注册
 * @date:2017-3-11
 */
import { connect } from 'react-redux';
import './index.less';
import {
  regAction,
} from '../store/userStore';
import Msg from '../ui/Msg';
import LoginBox from './ui/LoginBox';
import Footer from '../ui/Footer';

export default connect(({userState }) => ({
  userState,
}), {
  regAction,
})(({ regAction, }) => {
  console.log('outer');
  
  return (
      <div className={'r-web'}>
        <Msg/>
        {console.log('reg')}
        
        <LoginBox action={regAction}/>
        
        <Footer/>
      </div>);
});