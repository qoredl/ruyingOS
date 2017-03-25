/**
 * @Icon图标组件
 * @date:2016-12-1
 * update:2016-12-1
 */
export default function (props) {
	const iconName = 'r-icon ' + 'r-icon-' + (!props.iconName ? 'emoji': props.iconName);
	const text = !props.text ? props.text: '';
	
	if (props.type) {
		return <a href={!props.href ? props.href: ''} className={iconName}>{text}</a>;
	}
	
	return <span className={iconName}>{text}</span>;
}