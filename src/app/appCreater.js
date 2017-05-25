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
  const asyncLoadReducer = (replaceReducer, combineReducers, pubState) => (reducerName, reducerLoader) => () => reducerLoader(reducer => {
    //相同的reducer逻辑代码只添加一次
    if (!isCacked(reducerName)) {
      recCacke(reducerName, reducerLoader);
      replaceReducer(combineReducers(Object.assign(initState, {
        [reducerName]: reducer.default ? reducer.default: reducer,
      })))
    }
    
  });
  
  //动态加载saga
  const asyncLoadSaga = (sagaMiddleware, getState) => ({ sagaName, sagaLoader }) => () => sagaLoader(saga => {
    saga = saga.default ? saga.default: saga;
    
    //saga逻辑代码只运行一次
    if (!isCacked(sagaName)) {
      sagaMiddleware.run(saga, getState);
      recCacke(sagaName, saga);
    }
  });
  
  /**
   * reducerAdder列表
   * ************************************************************************************************************/
  const addReducerParamCache = asyncLoadReducer(store.replaceReducer, combineReducers, pubState);
  const reducerHomeAdder = addReducerParamCache('homeState', homeReducerLoader);
  const reducerUserAdder = addReducerParamCache('userState', userReducerLoader);
  
  /**
   * sagaAdder列表
   * ****************************************************************************************************************/
  const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
  const sagaHomeAdder = addSagaParamCache({ sagaName: 'sagaHome', sagaLoader: homeSagaLoader });
  const sagaRegAdder = addSagaParamCache({ sagaName: 'sagaReg', sagaLoader: regSagaLoader });
  const sagaLoginAdder = addSagaParamCache({ sagaName: 'sagaLogin', sagaLoader: loginSagaLoader });
  
  //动态加载组件
  //把路由url参数params原本传进去，
  // 以弥补react-router-redux中state无params数据
  const asyncLoadComp = (reducerAdder, sagaAdder) => compLoader => ({ location, match: { params } }) =>
          <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder} location={location} params={params}/>;
  
  /**
   * 生成路由组件,命名保持与路由路径一致，方便管理
   * ********************************************************************************************************/
  const home = asyncLoadComp(reducerHomeAdder, sagaHomeAdder)(HomeCompLoader);
  const user = asyncLoadComp(reducerUserAdder)(UserCompLoader);
  const reg = asyncLoadComp(reducerUserAdder, sagaRegAdder)(RegCompLoader);
  const login = asyncLoadComp(reducerUserAdder, sagaLoginAdder)(LoginCompLoader);
  
  const routeConfigs = [
    /**用户首页**/
    { exact: true, path: '/', render: home },
    
    /**用户首页**/
    { path: '/user', render: user },
    
    /**用户注册**/
    { path: '/reg', render: reg },
    
    /**用户登录**/
    { path: '/login', render: login },
    
    /**未匹配404**/
    { component: Err },
  ]
  
  return <Switch>{routeConfigs.map((config, i) => <Route key={i} {...config}/>)}</Switch>;
};