/**
 * @SwitchTab组件
 * @date:2016-12-4
 * update:2016-12-4
 */
import Nav from '../nav/index';
import SwitchItem from './SwitchItem';

export default props=> {
	const switchTapData = props.switchTapData;
	const navItem = switchTapData.item.map((item, i)=>
			<SwitchItem
					isOn={switchTapData.curIndex === i}
					text={item}>
				{props.children}
			</SwitchItem>);
	
	return (
			<article className="r-switch-box">
				<Nav {...props} navData={switchTapData}/>
				{navItem}
			</article>);
};