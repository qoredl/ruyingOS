/**
 * 用户注册
 * @date:2017-3-11
 */
import { connect } from 'react-redux';
import './index.less';
import {
  startRegAction,
} from '../store/user';
import Msg from '../ui/Msg';
import LoginBox from './ui/LoginBox';
import Footer from '../ui/Footer';

export default connect(({userState }) => ({
  userState,
}), {
  startRegAction,
})(({ startRegAction, }) => {
  console.log('outer');
  
  return (
      <div className={'r-page'}>
        <Msg/>
        {console.log('reg')}
        
        <LoginBox action={startRegAction}/>
        
        <Footer/>
      </div>);
});