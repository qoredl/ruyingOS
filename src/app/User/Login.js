/**
 * 用户注册组件
 * date:2017-3-11
 */
import { connect } from 'react-redux';
import './index.less';
import {
  changUserInfoAction,
  userStartFetchAction,
} from '../store/user/actions';
import Footer from '../ui/Footer';

import { Form, Icon, Input, Button, Checkbox, message, } from 'antd';
const FormItem = Form.Item;

export default connect(({ pub, routing, user }) => ({
  pub,
  routing,
  user,
}), {
  changUserInfoAction,
  userStartFetchAction,
})(props => {
  const {
    pub: {
      msg,
      isClosed,
      duration,
      msgType,
    },
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
  
  const showMsg=msg=>{
    message.config({duration});
    isClosed||message.destroy();
  
    if (!msg) return;
  
    message[msgType](msg)
  };
  
  return (
      <div className={'r-page'}>
        {showMsg(msg)}
        
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
                onClick={() => userStartFetchAction(userInfo)}>登录</Button>
            或 <a href="#reg">注册</a>
          </FormItem>
        </Form>
        
        <Footer/>
      </div>);
});