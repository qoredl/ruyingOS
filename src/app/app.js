/**
 * @app入口js
 * 稳定性：稳定
 * @date:2016-11-19
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { /*Router, */hashHistory } from 'react-router'
import createHistory from 'history/createHashHistory'
/*import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';*/

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import Routes from './Routes';
import reducers from './store';

const hashHistory=createHistory();

const sagaMiddleware=createSagaMiddleware();

//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，
const rMiddleware = routerMiddleware(hashHistory);

// 合成app store状态树。
const store = createStore(combineReducers({
	...reducers,
	routing: routerReducer
}), applyMiddleware(rMiddleware, sagaMiddleware,));

//const history = syncHistoryWithStore(hashHistory, store);
const ReactRedux = { Provider, connect };

Object.assign(window, { React, ReactDOM, ReactRedux, });

/*import User from './User';
import Login from './User/Login';
import Reg from './User/Reg';*/

ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={hashHistory}>
				<Routes sagaMiddleware={sagaMiddleware} store={store}/>
			</ConnectedRouter>
		</Provider>, document.getElementById('r-root'));

/*
ReactDOM.render(
		<Provider store={store}>
			<Router history={history} routes={routes({store,sagaMiddleware})}/>
		</Provider>, document.getElementById('r-root'));*/
