/**
 * app头部组件
 * date:2016-11-24
 */
import { Menu,Icon, } from 'antd';

export default props => {
	return <Menu>
		<Menu.Item><a href="/#"><Icon type="mail" />index</a></Menu.Item>
		<Menu.Item><a href="/#user">me</a></Menu.Item>
		<Menu.Item><a href="http://ruanyf.github.io/es-checker/index.cn.html">es-checker</a></Menu.Item>
	</Menu>;
}

