/**
 * 用户注册
 * date:2017-3-11
 */
import { connect } from 'react-redux';
import './index.less';
import {
  changUserInfoAction,
  regAction,
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
  regAction,
})((props) => {
  const {
    pub: {
      msg,
      msgDuration,
      msgType,
    },
    user: {
      userInfo,
    },
    changUserInfoAction,
    regAction,
  } = props;
  
  const handleUsernameChange = e => {
    changUserInfoAction({ ...userInfo, username: e.target.value });
  };
  const handlePasswordChange = e => {
    changUserInfoAction({ ...userInfo, password: e.target.value });
  };
  
  message.config({duration:msgDuration});
  
  const showMsg=msg=>{
    message.destroy();
    msg&&message[msgType](msg);
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
                onClick={() => regAction(userInfo)}>注册</Button>
          </FormItem>
        </Form>
        
        <Footer/>
      </div>);
});