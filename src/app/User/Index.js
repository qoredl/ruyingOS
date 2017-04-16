/**
 * User模块入口容器组件
 * date:2017-1-15
 */
import {connect} from 'react-redux';
import './index.less';
import Footer from '../ui/Footer';

export default connect(({ pub, routing, user }) => ({
	pub,
	routing,
	user,
}), {
	//actionCreater
})(props => {
	//解构用到的props
	const {
		user: {
			token,
			userInfo:{username},
		},
	} = props;
	
	return (
			<div className={'r-page'}>
				
				<div className={'r-wrap'}>
					{token ? <h2>{`您好！${username}`}</h2>
							: <div className={'loginBox'}>
								<h4>您尚未登录，请先<a href="#login">登录</a>！</h4>
								或<a href="#reg">注册新用户</a></div>}
				</div>
				
				<Footer/>
			</div>);
});