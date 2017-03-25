/**
 * 用户注册组件
 * date:2017-3-11
 * update:2017-3-19
 */
import { push/*,replace,go,goBack,goForward, */} from 'react-router-redux';
import * as userAction from '../store/user';
import { Msg, } from '../../rui/index';
import { Footer } from '../ui/index';
import './index.less';

import {Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

export default ReactRedux.connect(({ pub, routing, user }) => ({
	pub,
	routing,
	user,
}), {
	...userAction,
	push,
})((props) => {
	const {
			pub:{ msg },
			user:{ userInfo },
			loginAction,
			changUserInfoAction,
			push,
	}=props;
	
	const handleUsernameChange = (e)=> {
		changUserInfoAction({ ...userInfo, username: e.target.value });
	};
	const handlePasswordChange = (e)=> {
		changUserInfoAction({ ...userInfo, password: e.target.value });
	};
	
	return (
			<div className={'r-page'}>
				{msg && <Msg
						message={msg}
						type="warning"
						showIcon
						flashName="slideInDown"
						closable
						onClose={()=>''}/>}
				
				<Form className="login-form">
					<FormItem>
						<Input
								prefix={<Icon type="user" style={{ fontSize: 13 }} />}
								value={userInfo.username}
								placeholder="请输入用户名"
								onChange={handleUsernameChange}/>
					</FormItem>
					<FormItem>
						<Input
								prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
								type="password"
								placeholder="请输入密码"
								value={userInfo.password}
								onChange={handlePasswordChange}/>
					</FormItem>
					<FormItem>
						<Checkbox>记住</Checkbox>
						<a className="login-form-forgot">忘记密码？</a>
						<Button
								type="primary"
								className="login-form-button"
								onClick={()=>loginAction(userInfo)}>登录</Button>
						或 <a href="#reg">注册</a>
					</FormItem>
				</Form>
				
				{/*<div className={'loginBox'}>
					
					
					<Input
							placeholder="请输入用户名"
							prefix={<Icon type="user"/>}
							value={userInfo.username}
							onChange={handleUsernameChange}/>
					<Input
							placeholder="请输入密码"
							type='password'
							prefix={<Icon type="lock"/>}
							value={userInfo.password}
							onChange={handlePasswordChange}/>
					
					<Button type={'primary'} onClick={()=> {loginAction(userInfo)}}>登录</Button>
				</div>*/}
				
				<Footer/>
			</div>);
});