/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import sagaPub from './store/pub/sagaPub';
import Bundle from '../rui/Bundle';
import Err from './ui/Err';
import Home from './Home';

//创建组件动态加载器
import UserCompLoader from 'bundle-loader?lazy!./User';
import RegCompLoader from 'bundle-loader?lazy!./User/Reg';
import LoginCompLoader from 'bundle-loader?lazy!./User/Login';

//创建reducer动态加载器
import userReducerLoader from 'bundle-loader?lazy!./store/user/reducer';

//创建saga动态加载器
import sagaRegLoader from 'bundle-loader?lazy!./store/user/sagaReg';
import sagaLoginLoader from 'bundle-loader?lazy!./store/user/sagaLogin';

//缓存参数辅助函数*******************************************************************/
const cacheParam = (...arg) => f => f.apply(f, arg);

//动态按需加载组件*******************************************************************/
const asyncLoadComp = compLoader => (reducer, runSaga) => () =>
    <Bundle compLoader={compLoader} reducer={reducer} runSaga={runSaga}>
      {Comp => Comp ? <Comp/>: null}
    </Bundle>;

//动态按需加载reducer
const asyncLoadReducer = (loader, stateName) => (replaceReducer, combineReducers, initReducer) => () => loader(reducer =>
    replaceReducer(combineReducers({
      ...initReducer,
      [stateName]: reducer.default ? reducer.default: reducer,
    })));


//运行saga*******************************************************************/
//记录,检查saga
const sagaList = {};
const recSaga = (sagaName, saga) => sagaList[sagaName] = saga;
const hasSaga = sagaName => !!sagaList[sagaName];

const runSaga = (sagaMiddleware, getState) => ({ sagaName, sagaLoader }) => () => sagaLoader(saga => {
  const isRuned = hasSaga(sagaName);
  
  saga = saga.default ? saga.default: saga;
  isRuned || recSaga(sagaName, saga);
  
  //只运行一次添加进来的saga逻辑代码
  isRuned || sagaMiddleware.run(saga, getState);
});


//reducerAdder列表*******************************************************************/
const reducerUserAdder = cacheParamFn => cacheParamFn(asyncLoadReducer(userReducerLoader, 'userState'));

//sagaAdder列表
const sagaRegAdder = cacheParamFn => cacheParamFn(runSaga)({
  sagaName: 'sagaReg',
  sagaLoader: sagaRegLoader,
});
const sagaLoginAdder = cacheParamFn => cacheParamFn(runSaga)({
  sagaName: 'sagaLogin',
  sagaLoader: sagaLoginLoader,
});

//生成路由组件*******************************************************************/
const UserComp = asyncLoadComp(UserCompLoader);
const RegComp = asyncLoadComp(RegCompLoader);
const LoginComp = asyncLoadComp(LoginCompLoader);

/**
 * 路由设置函数
 * @param sagaMiddleware
 * @param store
 * @param combineReducers
 * @param initReducers
 * @returns {function(): XML}
 */
export default ({ sagaMiddleware, store, combineReducers, initReducers }) => {
  //马上加载公共saga
  sagaMiddleware.run(sagaPub, store.getState);
  
  //参数铺助函数
  const sagaParamFn = cacheParam(sagaMiddleware, store.getState);
  const reducerParamFn = cacheParam(store.replaceReducer, combineReducers, initReducers);
  
  //注：每次路由切换时此组件都会在运行一次,为了提升性能
  //请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
  return () => <Switch>
    {/*首页*/}
    <Route exact path="/" component={Home}/>
    
    {/*用户首页*/}
    <Route path="/user" component={UserComp(reducerUserAdder(reducerParamFn))}/>
    {/*用户注册*/}
    <Route path="/reg" component={RegComp(reducerUserAdder(reducerParamFn), sagaRegAdder(sagaParamFn))}/>
    {/*用户登录*/}
    <Route path="/login" component={LoginComp(reducerUserAdder(reducerParamFn), sagaLoginAdder(sagaParamFn))}/>
    
    {/*未匹配404*/}
    <Route component={Err}/>
  </Switch>;
};