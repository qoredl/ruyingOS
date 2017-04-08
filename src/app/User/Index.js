/**
 * User模块入口容器组件
 * date:2017-1-15
 */
import './index.less';
import Footer from '../ui/Footer';

export default ReactRedux.connect(({ pub, routing, user }) => ({
	pub,
	routing,
	user,
}), {
	//actionCreater
})(props => {
	//解构用到的props
	const {
		user: { token },
	} = props;
	
	return (
			<div className={'r-page'}>
				
				<div className={'r-wrap'}>
					{token ? <h1>用户中心</h1>
							: <div className={'loginBox'}>
								<h2>您尚未登录，请先登录！</h2>
								<a href="#login">登录</a>
								<br/>
								<a href="#reg">注册新用户</a></div>}
				</div>
				
				<Footer/>
			</div>);
});