/**
 * 数据库与state设计
 * @date:2017-3-20
 */

//state/////////////////////////////////////////////////////////////
		
//公共state
const pub={
			isShowMsg:false,//是否显示消息
			msg:''//消息内容
		};

//用户
const user={
	isFetching:false,//操作是否正在运行中
	isLogin: false,//是否已登录
	token:'',//sessionToken
	userInfo:{username:'ruying',password:'1234'},//用户信息
};

//store/////////////////////////////////////////////////////////////
const userStore={
	username:'ruying',//用户名
	password:'123',//密码
	email:'qoredl@163.com',//email
	nickname:'如影',//昵称
	img:'',//头像
	tel:'17088840072',//电话
	des:'前端工程师一枚。',//个人说明
};