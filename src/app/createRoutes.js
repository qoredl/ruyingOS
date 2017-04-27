/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import Bundle from '../rui/Bundle';
import Err from './ui/Err';
import Home from './Home';

//组件动态加载器
import UserCompLoader from 'bundle-loader?lazy!./User';
import RegCompLoader from 'bundle-loader?lazy!./User/Reg';
import LoginCompLoader from 'bundle-loader?lazy!./User/Login';

//reducer动态加载器
import userReducerLoader from 'bundle-loader?lazy!./store/user/reducer';

//saga动态加载器
import sagaRegLoader from 'bundle-loader?lazy!./store/user/sagaReg';
import sagaLoginLoader from 'bundle-loader?lazy!./store/user/sagaLogin';

/**
 * 生成路由
 * @param sagaMiddleware
 * @param store
 * @param combineReducers
 * @param initReducers
 * @returns {function(): XML}
 */
export default ({ sagaMiddleware, store, combineReducers, initReducers }) => {
  //动态加载组件
  const asyncLoadComp = compLoader => (reducerAdder, sagaAdder) => () =>
      <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder}>
        {Comp => Comp ? <Comp/>: null}
      </Bundle>;
  
  //动态加载reducer
  const asyncLoadReducer = (replaceReducer, combineReducers, initReducer) => (stateName, reducerLoader) => () => reducerLoader(reducer =>
      replaceReducer(combineReducers({
        ...initReducer,
        [stateName]: reducer.default ? reducer.default: reducer,
      })));
  
  //动态加载saga
  //记录,检查saga
  const sagaRecArr = [];
  const recSaga = sagaName => sagaRecArr.push(sagaName);
  const hasSaga = sagaName => sagaRecArr.includes(sagaName);
  
  const asyncLoadSaga = (sagaMiddleware, getState) => ({ sagaName, sagaLoader }) => () => sagaLoader(saga => {
    saga = saga.default ? saga.default: saga;
    
    //记录并只运行一次添加进来的saga逻辑代码
    if (!hasSaga(sagaName)) {
      sagaMiddleware.run(saga, getState);
      recSaga(sagaName, saga);
    }
  });
  
  //reducerAdder列表************************************************************************************************************/
  const addReducerParam = asyncLoadReducer(store.replaceReducer, combineReducers, initReducers);
  const reducerUserAdder = addReducerParam('userState', userReducerLoader);
  
  //sagaAdder列表****************************************************************************************************************/
  const addSagaParam = asyncLoadSaga(sagaMiddleware, store.getState);
  const sagaRegAdder = addSagaParam({ sagaName: 'sagaReg', sagaLoader: sagaRegLoader });
  const sagaLoginAdder = addSagaParam({ sagaName: 'sagaLogin', sagaLoader: sagaLoginLoader });
  
  
  //生成路由组件********************************************************************************************************/
  const UserComp = asyncLoadComp(UserCompLoader)(reducerUserAdder);
  const RegComp = asyncLoadComp(RegCompLoader)(reducerUserAdder, sagaRegAdder);
  const LoginComp = asyncLoadComp(LoginCompLoader)(reducerUserAdder, sagaLoginAdder);
  
  //注：每次路由切换时此组件都会在运行一次,为了提升性能************************************************************************/
  //请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
  return () => <Switch>
    {/*首页*/}
    <Route exact path="/" component={Home}/>
    
    {/*用户首页*/}
    <Route path="/user" component={UserComp}/>
    {/*用户注册*/}
    <Route path="/reg" component={RegComp}/>
    {/*用户登录*/}
    <Route path="/login" component={LoginComp}/>
    
    {/*未匹配404*/}
    <Route component={Err}/>
  </Switch>;
};