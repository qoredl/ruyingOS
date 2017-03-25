/**
 * @SwitchTab组件
 * @date:2016-12-4
 * update:2016-12-4
 */
export default function (props) {
	
	return props.isOn
			?<section className="r-switch-list">{props.text}</section>
			:<section className="r-switch-list" hidden>{props.text}</section>;
}