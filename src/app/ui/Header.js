/**
 * app根容器组件
 * date:2016-11-24
 * update:2017-2-21
 */
import {Icon, } from 'antd';

export default props=>{
	return (<header className={'r-header'}>
		<div className={'r-header-l'}><a href=""><Icon type="left"/>返回</a></div>
		<h2 className={'r-header-title'}>{props.title}</h2>
		<div className={'r-header-r'}><Icon type="smile-o"/></div>
	</header>);
}

