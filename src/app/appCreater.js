/**
 * appCreater高阶组件
 * 生成应用最外层App组件
 * 本文件改动会比较频繁
 * date:2017-5-23
 */
import Bundle from '../rui/Bundle';
import Err from './ui/Err';

//组件动态加载器
import HomeCompLoader from 'bundle-loader?lazy!./Home';
import UserCompLoader from 'bundle-loader?lazy!./User';
import RegCompLoader from 'bundle-loader?lazy!./User/Reg';
import LoginCompLoader from 'bundle-loader?lazy!./User/Login';

//reducer动态加载器
import homeReducerLoader from 'bundle-loader?lazy!./store/storeHome';
import userReducerLoader from 'bundle-loader?lazy!./store/storeUser';

//saga动态加载器
import homeSagaLoader from 'bundle-loader?lazy!./store/sagaHome';
import regSagaLoader from 'bundle-loader?lazy!./store/sagaReg';
import loginSagaLoader from 'bundle-loader?lazy!./store/sagaLogin';

//路由配置
const routeConfigs = [
  /**首页**/
  {
    exact: true,
    path: '/',
    comp: HomeCompLoader,
    reducer: {name:'homeState',loader:homeReducerLoader},
    saga: {name:'sagaHome',loader:homeSagaLoader},
  },
  
  /**用户中心**/
  {
    path: '/user',
    comp: UserCompLoader,
    reducer: {name:'userState',loader:userReducerLoader},
  },
  
  /**用户注册**/
  {
    path: '/reg',
    comp: RegCompLoader,
    reducer: {name:'userState',loader:userReducerLoader},
    saga: {name:'sagaReg',loader:regSagaLoader},
  },
  
  /**用户登录**/
  {
    path: '/login',
    comp: LoginCompLoader,
    reducer: {name:'userState',loader:userReducerLoader},
    saga: {name:'sagaLogin',loader:loginSagaLoader},
  },
];

/**
 * 生成App组件
 * @param sagaMiddleware
 * @param store
 * @param combineReducers
 * @param pubState
 * @returns {[*,*,*,*,*]}
 */
export default ({ sagaMiddleware, store, combineReducers, pubState }) => (Switch, Route) => {
  //app初始state
  const initState = { pubState };
  
  //加载器记录,检查
  const cacheContainer = [];
  const recCacke = cackeName => cacheContainer.push(cackeName);
  const isCacked = cackeName => cacheContainer.includes(cackeName);
  
  //动态加载reducer
  const asyncLoadReducer = (replaceReducer, combineReducers, pubState) => ({name, loader}) => () => loader(reducer => {
    //相同的reducer逻辑代码只添加一次
    if (!isCacked(name)) {
      recCacke(name, loader);
      replaceReducer(combineReducers(Object.assign(initState, {
        [name]: reducer.default ? reducer.default: reducer,
      })))
    }
    
  });
  
  //动态加载saga
  const asyncLoadSaga = (sagaMiddleware, getState) => ({ name, loader }) => () => loader(saga => {
    saga = saga.default ? saga.default: saga;
    
    //saga逻辑代码只运行一次
    if (!isCacked(name)) {
      sagaMiddleware.run(saga, getState);
      recCacke(name, saga);
    }
  });
  
  /**
   * reducerAdder列表
   * ************************************************************************************************************/
  const addReducerParamCache = asyncLoadReducer(store.replaceReducer, combineReducers, pubState);
  const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
  
  //动态加载组件
  //把路由url参数params原本传进去，
  // 以弥补react-router-redux中state无params数据
  const asyncLoadComp = compLoader =>(reducerAdder, sagaAdder) =>  ({ location, match: { params } }) =>
      <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder} location={location} params={params}/>;
  
  const routes = routeConfigs.map((config, i) => {
    const { exact, path, comp, reducer, saga } = config;
    let render=saga?asyncLoadComp(comp)(addReducerParamCache(reducer), addSagaParamCache(saga))
        :asyncLoadComp(comp)(addReducerParamCache(reducer))
    
    return <Route exact={!!exact} path={path} component={render}/>;
  });
  
  
  return <Switch>
    {routes}
    <Route component={Err}/>
  </Switch>;
};