/**
 * @Footer组件
 * @date:2016-11-22
 * update:2016-12-18
 */
import NavItem from './NavItem';

export default props=> {
	const navData = props.navData;
	const isSwitch = !!navData.item;
	const navItem = navData.navs.map((item, i)=>
			<NavItem
					{...props}
					key={i}
					index={i}
					isOn={navData.curIndex === i}
					href={item.href}
					iconName={item.iconName}
					text={item.text}
					isSwitch={isSwitch}
					navData={item.navData}>
				{props.children}
			</NavItem>);
	
	return props.isSub
			? <ul className="r-menu-sub" hidden>{navItem}</ul>
			: <ul className="r-footer-nav r-nav r-flex-avg r-menu">{navItem}</ul>;
};