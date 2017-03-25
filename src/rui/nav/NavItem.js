/**
 * @Footer组件
 * @date:2016-11-22
 * update:2016-12-18
 */
import Icon from '../Icon';
import Nav from './index';

export default props=>{
	const iocn=props.iconName ? <Icon iconName={props.iconName}/>:'';
	const navData=props.navData;
	
	return !navData
			? <li className={props.isOn?'on':''} onClick={handerSwitchNav}><a href={props.href?props.href:'#'}>{iocn}{props.text}</a></li>
			: <li className={props.isOn?'on':''}>{props.text}{<Nav navData={navData} isSub={true}/>}</li>;
	
	//切换导航项
	function handerSwitchNav(e) {
		props.handerSwitchNav(props.index);
		
		//如果为switchTab，则不跳链接
		props.isSwitch&&e.preventDefault();
	}
};