/**
 * 用户登录与注册框
 * @date:2016-11-19
 */
export default class extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };
  
  constructor(props) {
    super(props);
  }
  
  handleChangeUsername = e => {
    this.setState({ username: e.target.value })
  };
  
  handleChangePassword = e => {
    this.setState({ password: e.target.value })
  };
  
  hanleSubmit = e => this.props.action(this.state);
  
  render() {
    //相关变量解析
    const { type } = this.props;
    
    return <form className="r-form">
      <fieldset>
        <div className="r-form-inline">
          <b>用户名:</b>
          <input
              type="text"
              value={this.state.username}
              placeholder="请输入用户名"
              onChange={this.handleChangeUsername}
          />
        </div>
        <div className="r-form-inline">
          <b>用户名:</b>
          <input
              type="password"
              value={this.state.password}
              placeholder="请输入密码"
              onChange={this.handleChangePassword}
          />
        </div>
        <div>
          <label className="r-checkbox"><input type="checkbox"/><span className="r-input-mark">&nbsp;</span>记住</label>
          <a className="login-form-forgot">忘记密码？</a>
        </div>
        <div>
          <button type="button" className="r-btn r-btn-default login-form-button" onClick={this.hanleSubmit}>
            {type === 'login' ? '登录': '注册'}
          </button>
        </div>
      </fieldset>
    </form>;
  }
  
}