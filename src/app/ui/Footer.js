/**
 * app底部组件
 * date:2016-11-24
 */
import { Menu,Icon, } from 'antd';

export default props => {
  return (<Menu className="r-footer nav">
    <Menu.Item><a href="/#"><Icon type="left-circle-o" />首页</a></Menu.Item>
    <Menu.Item><a href="/#user"><Icon type="aliwangwang" />me</a></Menu.Item>
    <Menu.Item><a href="http://ruanyf.github.io/es-checker/index.cn.html">es-checker</a></Menu.Item>
  </Menu>);
}
