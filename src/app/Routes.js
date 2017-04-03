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

//动态加载saga
import logSagaLoader from 'bundle-loader?lazy!./store/pub/logSaga';
import regSagaLoader from 'bundle-loader?lazy!./store/user/regSaga';

//saga加载函数
const sagaLoadCreator=(sagaMiddleware,getState)=>saga=>
		sagaMiddleware.run(saga.default?saga.default:saga, getState);

const runSaga=(sagaMiddleware,getState,loadCreator,loader)=>{
	const load=loadCreator(sagaMiddleware,getState);
	loader(load);
};


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
			<Route exact path="/" component={asyncLoadComp(HomeLoad, runSaga(sagaMiddleware,getState,sagaLoadCreator,logSagaLoader))}/>
			
			{/*用户首页*/}
			<Route path="/user" component={asyncLoadComp(UserLoad)}/>
			
			{/*用户注册*/}
			<Route path="/reg" component={asyncLoadComp(RegLoad, runSaga(sagaMiddleware,getState,sagaLoadCreator,regSagaLoader))}/>
			
			{/*用户登录*/}
			<Route path="/login" component={asyncLoadComp(LoginLoad)}/>
			
			{/*未匹配404*/}
			<Route component={Err}/>
		</Switch>
);