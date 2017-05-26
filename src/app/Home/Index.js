/**
 * Home模块入口组件
 * date:2017-3-9
 */
import { connect } from 'react-redux';
import Footer from '../ui/Footer';
import { Spin } from 'antd';
import Html5 from '../ui/Html5';
import '../ui/less/app.less';

export default connect(({ homeState }) => ({
  homeState,
}), {})(props => {
  const { initData } = props.homeState;
  
  //初始化数据未加载前渲染，
  //一般在此渲染加载动画
  if (!initData) {
    return <Spin tip="Loading..."/>;
  }
  
  //初始化数据加载完后正常渲染页面
  return (<div className={'r-page'}>
    <div className={'r-wrap'}>
      <h1 className={'bg-test'}>首页</h1>
      <ul>
        {initData.map(item => <li><span><b>id:</b>{item.objectId}</span><span><b>data:</b>{item.homeTest}</span>
        </li>)}
      </ul>
      <img src={require('../images/logo.png')}/>
      <Html5 {...props}/>
    </div>
    <Footer/>
  </div>);
});