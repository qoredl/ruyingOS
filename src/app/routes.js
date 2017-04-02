/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route } from 'react-router';
import { Bundle } from './ui';
import { Err } from './ui';

//动态加载组件
import loadHomeComp from 'bundle-loader?lazy!./Home';
import loadUserComp from 'bundle-loader?lazy!./User';
import loadRegComp from 'bundle-loader?lazy!./User/Reg';
import loadLoginComp from 'bundle-loader?lazy!./User/Login';

import {
	logSaga,
	regSaga,
} from './store';

const asyncLoadComp = (comp, cb) => () => <Bundle load={comp} cb={cb}/>;

export default ({
	                sagaMiddleware,
	                store,
                }) => (
		<div className={'react-root'}>
			{/*首页*/}
			<Route exact path="/" component={asyncLoadComp(loadHomeComp, () => {
				//运行本模块saga逻辑
				sagaMiddleware.run(logSaga, store.getState);
			})}/>
			
			{/*用户首页*/}
			<Route path="/user" component={asyncLoadComp(loadUserComp, () => {
			
			})}/>
			
			{/*用户注册*/}
			<Route path="/reg" component={asyncLoadComp(loadRegComp, () => {
				//运行本模块saga逻辑
				sagaMiddleware.run(regSaga, store.getState);
			})}/>
			
			{/*用户登录*/}
			<Route path="/login" component={asyncLoadComp(loadLoginComp, () => {
			
			})}/>
			
			{/*<Route component={Err}/>*/}
		</div>
)

/*
 export default ({store,sagaMiddleware})=>[
 {
 path: '/',
 component: Root,//根路由组件
 indexRoute: {
 getComponent(nextStastore,sa{
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
 
 //运行本模块saga逻辑
 sagaMiddleware.run(regSaga,store.getState);
 },
 },
 
 {
 //用户登录
 path: '/login',
 getComponent(nextState, cb) {
 require.ensure([], (require) => cb(null, require('./User/Login').default));
 
 //运行本模块saga逻辑
 sagaMiddleware.run(logSaga,store.getState);
 },
 },
 ]
 },
 
 { path: '*', component: Err }
 ];*/
