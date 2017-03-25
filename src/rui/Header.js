/**
 * @Header组件
 * @date:2016-11-27
 * update:2016-12-1
 */
import Icon from './Icon';

export default function (props) {
	return (
			<header className="r-header">
				<div className="r-header-l"><Icon type="link" iconName="arrow" text="返回"/></div>
				<h2 className="r-header-title">{!props.headerTitle ? '页面标题': props.headerTitle}</h2>
				<div className="r-header-r"><Icon iconName="search"/></div>
			</header>
	)
}