/**
 * 用户注册
 * date:2017-3-11
 */
import './index.less';
import {
	changUserInfoAction,
	userStartFetchAction,
} from '../store/user/actions';
import { Msg, } from '../../rui/index';
import { Footer } from '../ui/index';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

export default ReactRedux.connect(({ pub, routing, user }) => ({
	pub,
	routing,
	user,
}), {
	changUserInfoAction,
	userStartFetchAction,
})((props) => {
	const {
		pub: { msg },
		user: {
			userInfo,
		},
		changUserInfoAction,
		userStartFetchAction,
	} = props;
	
	const handleUsernameChange = e => {
		changUserInfoAction({ ...userInfo, username: e.target.value });
	};
	const handlePasswordChange = e => {
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
						onClose={() => ''}/>}
				
				<Form className="login-form">
					<FormItem>
						<Input
								prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
								value={userInfo.username}
								placeholder="请输入用户名"
								onChange={handleUsernameChange}/>
					</FormItem>
					<FormItem>
						<Input
								prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
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
								onClick={() => userStartFetchAction(userInfo)}>注册</Button>
					</FormItem>
				</Form>
				
				<Footer/>
			</div>);
});