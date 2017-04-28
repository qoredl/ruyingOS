/**
 * Home模块入口组件
 * @date:2017-3-9
 */
import { connect } from 'react-redux';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import '../ui/app.less';

export default connect(({ routing,homeState}) => ({
  routing,
  homeState,
}), {})(({ routing,homeState}) => {
  return (
      <div className={'r-page'}>
        <Header title={'标题'}/>
        <div className={'r-wrap'}>
          <h1>首页</h1>
        </div>
        <Footer/>
      </div>);
});