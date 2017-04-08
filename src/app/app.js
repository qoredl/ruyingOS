/**
 * @app入口js
 * 稳定性：稳定
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
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
const store = createStore(combineReducers({ ...reducers, routing: routerReducer}), applyMiddleware(rMiddleware, sagaMiddleware,));

//const ReactRedux = { Provider, connect};

Object.assign(window, { React, });

ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={hashHistory}>
				<Routes sagaMiddleware={sagaMiddleware} getState={store.getState}/>
			</ConnectedRouter>
		</Provider>, document.getElementById('r-root'));
