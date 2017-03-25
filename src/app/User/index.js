/**
 * @User模块入口容器组件
 * @date:2017-1-15
 * update:2017-3-12
 */
import { Footer } from '../ui/index';
import './index.less';

export default ReactRedux.connect(({ pub, routing, user }) => ({
	pub,
	routing,
	user,
}), {
	
})((props) => {
	//解构用到的props属性
	const {
			user:{ token },
			push,
	}=props;
	
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