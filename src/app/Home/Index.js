/**
 * Home模块入口组件
 * @date:2017-3-9
 */
import { connect } from 'react-redux';
import Footer from '../ui/Footer';
import '../ui/app.less';

export default connect(({ homeState}) => ({
  homeState,
}), {})(({homeState}) => {
  return (
      <div className={'r-page'}>
        <div className={'r-wrap'}>
          <h1 className={'bg-test'}>首页88886888888</h1>
          <img src={require('../images/logo.png')}/>
        </div>
        <Footer/>
      </div>);
});