/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './store';
import Routes from './Routes';

const hashHistory = createHistory();
const sagaMiddleware = createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(hashHistory);

// 合成app store状态树。
//整个app只有一个store
const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer
}), applyMiddleware(rMiddleware, sagaMiddleware,));

Object.assign(window, { React, });

//渲染app
ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={hashHistory}>
        <Routes sagaMiddleware={sagaMiddleware} getState={store.getState}/>
      </ConnectedRouter>
    </Provider>, document.getElementById('r-root'));
