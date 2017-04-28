/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
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
import regSagaLoader from 'bundle-loader?lazy!./store/user/regSaga';
import loginSagaLoader from 'bundle-loader?lazy!./store/user/loginSaga';

/**
 * 生成路由
 * @param sagaMiddleware
 * @param store
 * @param combineReducers
 * @param initReducers
 * @returns {[*,*,*,*,*]}
 */
export default ({ sagaMiddleware, store, combineReducers, initReducers }) => {
  //动态加载组件
  const asyncLoadComp = compLoader => (reducerAdder, sagaAdder) =>
      () => <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder}/>;
  
  //动态加载reducer
  const asyncLoadReducer = (replaceReducer, combineReducers, initReducer) => (reducerName, reducerLoader) =>
      () => reducerLoader(reducer => replaceReducer(combineReducers({
        ...initReducer,
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
  const addReducerParamCache = asyncLoadReducer(store.replaceReducer, combineReducers, initReducers);
  const reducerUserAdder = addReducerParamCache('userState', userReducerLoader);
  
  /**
   * sagaAdder列表
   * ****************************************************************************************************************/
  const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
  const sagaRegAdder = addSagaParamCache({ sagaName: 'sagaReg', sagaLoader: regSagaLoader });
  const sagaLoginAdder = addSagaParamCache({ sagaName: 'sagaLogin', sagaLoader: loginSagaLoader });
  
  /**
   * 生成路由组件
   * ********************************************************************************************************/
  const UserComp = asyncLoadComp(UserCompLoader)(reducerUserAdder);
  const RegComp = asyncLoadComp(RegCompLoader)(reducerUserAdder, sagaRegAdder);
  const LoginComp = asyncLoadComp(LoginCompLoader)(reducerUserAdder, sagaLoginAdder);
  
  return [
    /**首页**/
    { exact: true, path: '/', component: Home },
    
    /**用户首页**/
    { path: '/user', component: UserComp },
    /**用户注册**/
    { path: '/reg', component: RegComp },
    /**用户登录**/
    { path: '/login', component: LoginComp },
    
    /**未匹配404**/
    { component: Err },
  ];
};