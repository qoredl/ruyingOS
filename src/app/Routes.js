/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import { Empty } from '../rui';
import { Bundle, Err } from './ui';
import Home from './Home';
import logSaga from './store/pub/logSaga';

//首页直接加载
const loadIndex=(sagaMiddleware, getState)=>{
	sagaMiddleware.run(logSaga, getState);
	return Home;
};

//创建组件动态加载器
import UserLoader from 'bundle-loader?lazy!./User';
import RegLoader from 'bundle-loader?lazy!./User/Reg';
import LoginLoader from 'bundle-loader?lazy!./User/Login';

//创建saga动态加载器
import regSagaLoader from 'bundle-loader?lazy!./store/user/regSaga';

//saga加载函数生成器
const sagaLoadCreator=(sagaMiddleware,getState)=>saga=>
		sagaMiddleware.run(saga.default?saga.default:saga, getState);

//saga动态加载回调函数
const sagaCb=(sagaMiddleware,getState,loader)=>()=>{
	const load=sagaLoadCreator(sagaMiddleware,getState);
	loader(load);
};

//动态按需加载组件
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
			<Route exact path="/" component={loadIndex(sagaMiddleware, getState)}/>
			
			{/*用户首页*/}
			<Route path="/user" component={asyncLoadComp(UserLoader)}/>
			
			{/*用户注册*/}
			<Route path="/reg" component={asyncLoadComp(RegLoader, sagaCb(sagaMiddleware,getState,regSagaLoader))}/>
			
			{/*用户登录*/}
			<Route path="/login" component={asyncLoadComp(LoginLoader)}/>
			
			{/*未匹配404*/}
			<Route component={Err}/>
		</Switch>
);