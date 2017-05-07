/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import pubState from './store/pubStore';
import homeState from './store/homeStore';
import homeSaga from './store/homeSaga';

import createRoutesConfig from './createRoutesConfig';


Object.assign(window, { React});

const hashHistory = createHistory();
const sagaMiddleware = createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(hashHistory);

// 合成app store状态树,整个app只有一个store
const initState=window.__initState__;
let store;

if (process.env.NODE_ENV !== 'production') {
  //生产环境才执行的代码
  store = createStore(combineReducers({pubState,homeState}),initState, compose(
      applyMiddleware(rMiddleware, sagaMiddleware,),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}else {
  //产品环境
  store = createStore(combineReducers({pubState,homeState}),initState, applyMiddleware(rMiddleware, sagaMiddleware,));
}

//运行首页
sagaMiddleware.run(homeSaga, store.getState);

//生成路由组件
const routesConfig = createRoutesConfig({ store, sagaMiddleware, combineReducers, pubState, });

//渲染app
ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={hashHistory}>
        <Switch>
          {routesConfig.map((config, i) => <Route key={i} {...config}/>)}
        </Switch>
      </ConnectedRouter>
    </Provider>, document.getElementById('r-root'));
