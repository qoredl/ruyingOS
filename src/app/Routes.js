/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import { Bundle, runSaga, Empty } from '../rui';
import { Err } from './ui';
import Home from './Home';//返回Index为高阶组件
import logSaga from './store/pub/logSaga';

System.import('./Home').then(function (data) {
	console.log(data);
});

//运行动态加载的saga
const runAsyncSaga = (sagaMiddleware, getState) => saga =>
		sagaMiddleware.run(saga.default ? saga.default: saga, getState);

//动态按需加载saga
const asyncLoadSaga = (sagaMiddleware, getState) =>loader=> () => {
	const load = runAsyncSaga(sagaMiddleware, getState);
	loader(load);
};

//动态按需加载组件
const asyncLoadComp = (compLoader, addSaga) => () =>
		<Bundle load={compLoader}>
			{Comp => {
				Comp=Comp ? Comp: Empty;
				Comp=addSaga?addSaga(Comp):Comp;
				return <Comp/>;
			}}
		</Bundle>;

//创建组件动态加载器*******************************************************************/
import UserLoader from 'bundle-loader?lazy!./User';
import RegLoader from 'bundle-loader?lazy!./User/Reg';
import LoginLoader from 'bundle-loader?lazy!./User/Login';

//创建saga动态加载器
import regSagaLoader from 'bundle-loader?lazy!./store/user/regSaga';

export default ({ sagaMiddleware, getState, }) => {
	//辅助函数
	const sagaHelper=((sagaMiddleware, getState)=>f=>f(sagaMiddleware, getState))(sagaMiddleware, getState);
	//添加saga函数
	const addSaga = saga=>sagaHelper(runSaga)(saga);
	
	//saga列表
	const regSaga=sagaHelper(asyncLoadSaga)(regSagaLoader);
	
	return <Switch>
		{/*首页*/}
		<Route exact path="/" component={addSaga(logSaga)(Home)}/>
		
		{/*用户首页*/}
		<Route path="/user" component={asyncLoadComp(UserLoader)}/>
		
		{/*用户注册*/}
		<Route path="/reg" component={asyncLoadComp(RegLoader,addSaga(regSaga))}/>
		
		{/*用户登录*/}
		<Route path="/login" component={asyncLoadComp(LoginLoader)}/>
		
		{/*未匹配404*/}
		<Route component={Err}/>
	</Switch>;
};