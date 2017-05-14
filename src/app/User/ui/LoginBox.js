/**
 * 用户登录与注册框
 * @date:2016-11-19
 */
import { Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

export default class extends React.PureComponent{
  state={
    username:'',
    password:'',
  };
  
  constructor(props){
    super(props);
  }
  
  handleChangeUsername = e => {
    this.setState({username: e.target.value})
  };
  
  handleChangePassword = e => {
    this.setState({password: e.target.value})
  };
  
  hanleSubmit=e=>this.props.action(this.state);
  
  render(){
    //相关变量解析
    const {type}=this.props;
    
    return <Form className="login-form">
      <FormItem>
        <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
            value={this.state.username}
            placeholder="请输入用户名"
            onChange={this.handleChangeUsername}/>
      </FormItem>
      <FormItem>
        <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
            type="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.handleChangePassword}/>
      </FormItem>
      <FormItem>
        <Checkbox>记住</Checkbox>
        <a className="login-form-forgot">忘记密码？</a>
        <Button
            type="primary"
            className="login-form-button"
            onClick={this.hanleSubmit}>{type==='login'?'登录':'注册'}</Button>
      </FormItem>
    </Form>;
  }
  
}