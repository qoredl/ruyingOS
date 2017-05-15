/**
 * Home模块入口组件
 * @date:2017-3-9
 */
import { connect } from 'react-redux';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import '../ui/app.less';

export default connect(({ homeState}) => ({
  homeState,
}), {})(({homeState}) => {
  return (
      <div className={'r-web'}>
        <Header title={'标题'}/>
        <div className={'r-wrap'}>
          <h1 className={'bg-test'}>首页</h1>
          <img src={require('../images/logo.png')}/>
        </div>
        <Footer/>
      </div>);
});