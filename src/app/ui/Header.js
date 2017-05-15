/**
 * app头部组件
 * date:2016-11-24
 */
export default props => {
	return (<header className={'r-header'}>
		<div className={'r-header-l'}><a href="" className="r-icon r-icon-left">返回</a></div>
		<h2 className={'r-header-title'}>{props.title}</h2>
		<div className={'r-header-r'}><span className="r-icon r-icon-user">&nbsp;</span><span className="r-icon r-icon-github">&nbsp;</span></div>
	</header>);
}

