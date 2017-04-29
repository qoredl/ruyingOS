import { Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

export default class extends React.Component{
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
  
  render(){
    //相关变量解析
    const {action,type}=this.props;
    
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
            onClick={() => action(this.state)}>{type==='login'?'登录':'注册'}</Button>
      </FormItem>
    </Form>;
  }
  
}