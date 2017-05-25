/**
 * 组件修饰器
 * date:2017-5-25
 */
//reducer动态加载器
import homeReducerLoader from 'bundle-loader?lazy!./store/storeHome';

//saga动态加载器
import homeSagaLoader from 'bundle-loader?lazy!./store/sagaHome';
//动态加载组件
//把路由url参数params原本传进去，
// 以弥补react-router-redux中state无params数据
const asyncLoadComp = compLoader => (reducerAdder, sagaAdder) =>
    ({ location, match: { params } }) =>
        <Bundle compLoader={compLoader} reducerAdder={reducerAdder} sagaAdder={sagaAdder} location={location} params={params}/>;

//加载器记录,检查
const cacheContainer = [];
const recCacke = cackeName => cacheContainer.push(cackeName);
const isCacked = cackeName => cacheContainer.includes(cackeName);

//动态加载reducer
const initState = { pubState };//初始state
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

/**
 * sagaAdder列表
 * ****************************************************************************************************************/
const addSagaParamCache = asyncLoadSaga(sagaMiddleware, store.getState);
const sagaHomeAdder = addSagaParamCache({ sagaName: 'sagaHome', sagaLoader: homeSagaLoader });

export default () => Route => {
  return Route;
};