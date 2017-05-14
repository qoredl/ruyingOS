/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */

import Bundle from '../rui/Bundle';
import Home from './Home';
import Err from './ui/Err';

//组件动态加载器
import UserCompLoader from 'bundle-loader?lazy!./User';
import RegCompLoader from 'bundle-loader?lazy!./User/Reg';
import LoginCompLoader from 'bundle-loader?lazy!./User/Login';

//reducer动态加载器
import userReducerLoader from 'bundle-loader?lazy!./store/userStore';

//saga动态加载器
import regSagaLoader from 'bundle-loader?lazy!./store/regSaga';
import loginSagaLoader from 'bundle-loader?lazy!./store/loginSaga';

//服务器端渲染数据同步
import User from './User';
import Reg from './User/Reg';
import Login from './User/Login';
import {
  getData as homeData
} from './servers/homeServer';

/**
 * 生成路由
 * @param sagaMiddleware
 * @param store
 * @param combineReducers
 * @param pubState
 * @returns {[*,*,*,*,*]}
 */
export default ({ sagaMiddleware, store, combineReducers, pubState,isSever}) => {
  
  //动态加载组件
  //把路由url参数params原本传进去，
  // 以弥补react-router-redux中state无params数据
  const asyncLoadComp = compLoader => (reducerAdder, sagaAdder) =>
      ({location,match:{params}}) => <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder} location={location} params={params}/>;
  
  //动态加载reducer
  const asyncLoadReducer = (replaceReducer, combineReducers, pubState) => (reducerName, reducerLoader) =>
      () => reducerLoader(reducer => replaceReducer(combineReducers({
        pubState,
        [reducerName]: reducer.default ? reducer.default: reducer,
      })));
  
  //记录,检查saga
  const sagaRecContainer = [];
  const recSaga = sagaName => sagaRecContainer.push(sagaName);
  const hasSaga = sagaName => sagaRecContainer.includes(sagaName);
  
  //动态加载saga
  const asyncLoadSaga = (sagaMiddleware, getState) => ({ sagaName, sagaLoader }) => () => sagaLoader(saga => {
    saga = saga.default ? saga.default: saga;
    
    //记录并只运行一次添加进来的saga逻辑代码
    if (!hasSaga(sagaName)) {
      sagaMiddleware.run(saga, getState);
      recSaga(sagaName, saga);
    }
  });
  
  /**
   * reducerAdder列表
   * ************************************************************************************************************/
  const addReducerParamCache = asyncLoadReducer(store.replaceReducer, combineReducers, pubState);
  const reducerUserAdder = addReducerParamCache('userState', userReducerLoader);
  
  /**
   * sagaAdder列表
   * ****************************************************************************************************************/
  const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
  const sagaRegAdder = addSagaParamCache({ sagaName: 'sagaReg', sagaLoader: regSagaLoader });
  const sagaLoginAdder = addSagaParamCache({ sagaName: 'sagaLogin', sagaLoader: loginSagaLoader });
  
  /**
   * 生成路由组件,命名保持与路由路径一致，方便管理
   * ********************************************************************************************************/
  let userComp = asyncLoadComp(UserCompLoader)(reducerUserAdder);
  let regComp = asyncLoadComp(RegCompLoader)(reducerUserAdder, sagaRegAdder);
  let loginComp = asyncLoadComp(LoginCompLoader)(reducerUserAdder, sagaLoginAdder);
  
  /*if (isSever) {
    userComp=User;
    regComp=Reg;
    loginComp=Login;
  }*/
  
  return [
    /**用户首页**/
    { exact:true,path: '/', component: Home,loadData:homeData,stateName:'homeState' },
    
    /**用户首页**/
    { path: '/user', render: userComp,loadData:homeData, },
    
    /**用户注册**/
    { path: '/reg', render: regComp,loadData:homeData, },
    
    /**用户登录**/
    { path: '/login', render: loginComp,loadData:homeData, },
    
    /**未匹配404**/
    {component: Err },
  ];
};