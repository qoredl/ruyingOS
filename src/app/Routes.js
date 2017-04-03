/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import { Empty } from '../rui';
import { Bundle, Err } from './ui';

//动态加载组件
import HomeLoad from 'bundle-loader?lazy!./Home';
import UserLoad from 'bundle-loader?lazy!./User';
import RegLoad from 'bundle-loader?lazy!./User/Reg';
import LoginLoad from 'bundle-loader?lazy!./User/Login';


import logSagaLoad from 'bundle-loader?lazy!./store/logSaga';

import {
	logSaga,
	regSaga,
} from './store';

const asyncLoadComp = (compLoad, cb) => () =>
		<Bundle load={compLoad}>
			{Comp => {
				cb&&cb();
				return Comp ? <Comp/>: <Empty/>;
			}}
		</Bundle>;

export default ({ sagaMiddleware, getState, }) => (
		<Switch>
			{/*首页*/}
			<Route exact path="/" component={asyncLoadComp(HomeLoad, () => sagaMiddleware.run(logSaga, getState))}/>
			
			{/*用户首页*/}
			<Route path="/user" component={asyncLoadComp(UserLoad)}/>
			
			{/*用户注册*/}
			<Route path="/reg" component={asyncLoadComp(RegLoad, () => sagaMiddleware.run(regSaga, getState))}/>
			
			{/*用户登录*/}
			<Route path="/login" component={asyncLoadComp(LoginLoad)}/>
			
			{/*未匹配404*/}
			<Route component={Err}/>
		</Switch>
);