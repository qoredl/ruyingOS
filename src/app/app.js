/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerReducer as routing, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import pubState from './store/pub/reducer';
import homeState from './store/home/reducer';
import { logSaga } from './store/pub/pubSaga';
import createRoutesConfig from './createRoutesConfig';

const hashHistory = createHistory();
const sagaMiddleware = createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(hashHistory);

// 合成app store状态树。
//整个app只有一个store
const initReducers = { routing, pubState, homeState };
const store = createStore(combineReducers(initReducers), applyMiddleware(rMiddleware, sagaMiddleware,));

Object.assign(window, { React});

//生成路由组件
const routesConfig = createRoutesConfig({ store, sagaMiddleware, combineReducers, initReducers, });

//生产环境才执行的代码
if (process.env.NODE_ENV !== 'production') {
  //运行actions执行日志saga
  sagaMiddleware.run(logSaga, store.getState);
}

//渲染app
ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={hashHistory}>
        <Switch>
          {routesConfig.map((config, i) => <Route key={i} {...config}/>)}
        </Switch>
      </ConnectedRouter>
    </Provider>, document.getElementById('r-root'));
