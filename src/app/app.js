/**
 * @app入口js
 * 稳定性：稳定
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { thunk, logger, } from '../lib/redux-middleware';
import routes from './routes';
import * as reducers from './store';

const ReactRedux = { Provider, connect };

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(hashHistory);

// 合成app store状态树。
const store = createStore(combineReducers({
	...reducers,
	routing: routerReducer
}), applyMiddleware(thunk, rMiddleware, logger,));

const history = syncHistoryWithStore(hashHistory, store);

Object.assign(window, { React, ReactDOM, ReactRedux, });

ReactDOM.render(
		<Provider store={store}>
			<Router history={history} routes={routes}/>
		</Provider>, document.getElementById('r-root'));
