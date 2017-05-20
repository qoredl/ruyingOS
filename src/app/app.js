/**
 * app入口js
 * 稳定性：3
 * date:2016-11-19
 */

//生产环境
/*import React from 'react';
 import ReactDOM from 'react-dom';
 import { Route, Switch, } from 'react-router-dom';
 import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
 import { Provider } from 'react-redux';
 import createHistory from 'history/createHashHistory'
 import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
 import createSagaMiddleware from 'redux-saga';
 
 Object.assign(window, { React });*/


//开发环境
const { Route, Switch } = ReactRouterDOM;
const { createStore, combineReducers, applyMiddleware, compose } = Redux;
const { Provider } = ReactRedux;
const { createHashHistory: createHistory } = History;
const { ConnectedRouter, routerMiddleware } = ReactRouterRedux;
const { default: createSagaMiddleware } = ReduxSaga;

import '../var/string.extend.js';
import pubState from './store/storePub';
import createRoutesConfig from './createRoutesConfig';
import '../../cordova/www/js/vconsole.min';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(history);

//合成app store状态树,整个app只有一个store
let store;

if (process.env.NODE_ENV !== 'production') {
  //生产环境
  store = createStore(pubState, compose(
      applyMiddleware(rMiddleware, sagaMiddleware,),
      window.devToolsExtension ? window.devToolsExtension(): f => f
  ));
} else {
  //产品环境
  store = createStore(pubState, applyMiddleware(rMiddleware, sagaMiddleware,));
}

//生成路由配置
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
