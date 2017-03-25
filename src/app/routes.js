/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Root, Err } from './ui'

export default [
	{
		path: '/',
		component: Root,//根路由组件
		indexRoute: {
			getComponent(nextState, cb) {
				require.ensure([], (require) => cb(null, require('./home/index').default));
			}
		},
		
		childRoutes: [
			{
				//用户首页
				path: '/user',
				getComponent(nextState, cb) {
					require.ensure([], (require) => cb(null, require('./User/index').default));
				},
				onEnter(nextState, replaceState){
					//replaceState(null, '/messages/' + nextState.params.id);
					console.log('你进入了模块!')
				},
				onLeave(){
					console.log('你离开了模块!')
				},
			},
			
			{
				//用户注册
				path: '/reg',
				getComponent(nextState, cb) {
					require.ensure([], (require) => cb(null, require('./User/Reg').default));
				},
			},
			
			{
				//用户登录
				path: '/login',
				getComponent(nextState, cb) {
					require.ensure([], (require) => cb(null, require('./User/Login').default));
				},
			},
		]
	},
	
	{ path: '*', component: Err }
];