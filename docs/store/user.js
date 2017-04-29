/**
 * 数据库与state设计
 * @date:2017-3-20
 */
 
//state******************************************************
//公共state
const pub = {
      msg: '',//消息内容
      duration:3,//全局信息显示时间，单位:秒
      isShowing: false,//是否正在显示消息
      msgType: 'info',//消息内容类型,info:一般;success:成功；error：出错；warning：警告；loading：加载中
  
    };

//用户
const user = {
  token: '',//sessionToken
  userInfo: { id: 'sdffs33', username: 'ruying', password: '1234' },//用户信息
};



//db******************************************************
const userStore = {
  username: 'ruying',//用户名
  password: '123',//密码
  email: 'qoredl@163.com',//email
  nickname: '如影',//昵称
  img: '',//头像
  tel: '17088840072',//电话
  des: '前端工程师一枚。',//个人说明
};