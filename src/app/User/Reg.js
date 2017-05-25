/**
 * 用户注册
 * @date:2017-3-11
 */
import { connect } from 'react-redux';
import {
  regAction,
} from '../store/storeUser';
import Msg from '../ui/Msg';
import LoginBox from './ui/LoginBox';
import Footer from '../ui/Footer';
import '../ui/less/app.less';
import './less/index.less';

export default connect(({ userState }) => ({
  userState,
}), {
  regAction,
})(({ regAction, }) => {
  console.log('outer');
  
  return (
      <div className={'r-page'}>
        <Msg/>
        {console.log('reg')}
        <LoginBox action={regAction}/>
        <Footer/>
      </div>);
});