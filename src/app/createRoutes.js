/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import sagaPub from './store/pub/sagaPub';
//import userState from './store/user/reducer';

import replaceReducerInComp from '../rui/replaceReducersInComp';
import runSagaInComp from '../rui/runSagaInComp';
import Bundle from '../rui/Bundle';
import Err from './ui/Err';
import Home from './Home';

//缓存参数辅助函数
const cacheParam = (...arg) => f => f.apply(f,arg);

//动态按需加载组件
const asyncLoadComp = compLoader => (reducers,runSaga) => () =>
    <Bundle load={compLoader}>
      {Comp => {
        //过虑掉第一次渲染时null值
        if (!Comp) {
          return null;
        }
  
        let Tag= reducers ? reducers(Comp): Comp;
        Tag = runSaga ? runSaga(Tag): Tag;
  
        return <Tag/>;
      }}
    </Bundle>;

//动态按需加载saga
const asyncLoadReducer = (loader,stateName) => (replaceReducer,combineReducers, initReducer)=> () => loader(reducer => {
  console.log(9999);
  return replaceReducer(combineReducers({
    ...initReducer,
    [stateName]:reducer.default?reducer.default:reducer,
  }))
});

//动态按需加载saga
const asyncLoadSaga = loader => (sagaMiddleware, getState) => () => loader(saga => sagaMiddleware.run(saga.default ? saga.default: saga, getState));

//添加saga函数
const addSagaToComp = saga => (sagaMiddleware, getState) => runSagaInComp(sagaMiddleware, getState)(saga);

//添加reducer函数
const addRuducerToComp = reducer => replaceReducerInComp(reducer);

//创建组件动态加载器*******************************************************************/
import UserLoader from 'bundle-loader?lazy!./User';
import RegLoader from 'bundle-loader?lazy!./User/Reg';
import LoginLoader from 'bundle-loader?lazy!./User/Login';

//创建reducer动态加载器
import userReducerLoader from 'bundle-loader?lazy!./store/user/reducer';

//创建saga动态加载器
import sagaRegLoader from 'bundle-loader?lazy!./store/user/sagaReg';
import sagaLoginLoader from 'bundle-loader?lazy!./store/user/sagaLogin';

const UserComp = asyncLoadComp(UserLoader);
const RegComp = asyncLoadComp(RegLoader);
const LoginComp = asyncLoadComp(LoginLoader);

//reducerAdder列表
const reducerUserAdder = cacheParamFn => addRuducerToComp(cacheParamFn(asyncLoadReducer(userReducerLoader,'userState')));

//sagaAdder列表
const sagaRegAdder = cacheParamFn => cacheParamFn(addSagaToComp({
  sagaName: 'sagaReg',
  saga: cacheParamFn(asyncLoadSaga(sagaRegLoader))
}));
const sagaLoginAdder = cacheParamFn => cacheParamFn(addSagaToComp({
  sagaName: 'sagaLogin',
  saga: cacheParamFn(asyncLoadSaga(sagaLoginLoader))
}));

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
  
  /*store.replaceReducer(combineReducers({
    ...initReducers,
    userState,
  }));*/
  
  //参数铺助函数
  const sagaParamFn = cacheParam(sagaMiddleware, store.getState);
  const reducerParamFn = cacheParam(store.replaceReducer,combineReducers, initReducers);
  
  
  //注：每次路由切换时此组件都会在运行一次,为了提升性能
  //请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
  return () => <Switch>
    {/*首页*/}
    <Route exact path="/" component={Home}/>
    
    {/*用户首页*/}
    <Route path="/user" component={UserComp(reducerUserAdder(reducerParamFn))}/>
    {/*用户注册*/}
    <Route path="/reg" component={RegComp(reducerUserAdder(reducerParamFn),sagaRegAdder(sagaParamFn))}/>
    {/*用户登录*/}
    <Route path="/login" component={LoginComp(reducerUserAdder(reducerParamFn),sagaLoginAdder(sagaParamFn))}/>
    
    {/*未匹配404*/}
    <Route component={Err}/>
  </Switch>;
};