/**
 * appCreater高阶组件
 * 生成应用最外层App组件
 * 稳定性：3
 * date:2017-5-23
 */
import Bundle from '../../rui/Bundle';
//路由配置
import routeConfigs from '../config/routes';

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
  
  //动态加载组件
  //把路由url参数params原本传进去，
  // 以弥补react-router-redux中state无params数据
  const asyncLoadComp = compLoader =>(reducerAdder, sagaAdder) =>  ({ location, match: { params } }) =>
      <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder} location={location} params={params}/>;
  
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
   * 缓存参数
   * ************************************************************************************************************/
  const addReducerParamCache = asyncLoadReducer(store.replaceReducer, combineReducers, pubState);
  const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
  
  //返回app组件
  return <Switch>
    {routeConfigs.map((config, i) => {
      const { exact, path, comp, reducer, saga } = config;
      
      if (path) {
        let render=saga?asyncLoadComp(comp)(addReducerParamCache(reducer), addSagaParamCache(saga))
            :asyncLoadComp(comp)(addReducerParamCache(reducer))
  
        return <Route exact={!!exact} path={path} component={render}/>;
      }
  
      return <Route component={comp}/>;
    })}
  </Switch>;
};