/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
//产品环境
/*import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';*/

//生产环境
const { Route, Switch} = ReactRouterDOM;
const { createStore, combineReducers, applyMiddleware, compose } = Redux;
const { Provider } = ReactRedux;
const { createBrowserHistory: createHistory } = History;
const { ConnectedRouter, routerMiddleware } = ReactRouterRedux;
const { default: createSagaMiddleware } = ReduxSaga;

Object.assign(window, { reactRouter: ReactRouter });


import pubState from './store/pubStore';
import homeState from './store/homeStore';
import homeSaga from './store/homeSaga';

import createRoutesConfig from './createRoutesConfig';

Object.assign(window, { React });

let store;
// 合成app store状态树,整个app只有一个store
const initState = window.__initState__;

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(history);

//生产环境
if (process.env.NODE_ENV !== 'production') {
  store = createStore(combineReducers({ pubState, homeState }), initState, compose(
      applyMiddleware(rMiddleware, sagaMiddleware,),
      window.devToolsExtension ? window.devToolsExtension(): f => f
  ));
}

store = createStore(combineReducers({ pubState, homeState }), initState, applyMiddleware(rMiddleware, sagaMiddleware,));

//运行首页
sagaMiddleware.run(homeSaga, store.getState);

//生成路由组件
const routesConfig = createRoutesConfig({ store, sagaMiddleware, combineReducers, pubState, });

//渲染app
ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routesConfig.map((config, i) => <Route key={i} {...config}/>)}
        </Switch>
      </ConnectedRouter>
    </Provider>, document.getElementById('r-root'));
