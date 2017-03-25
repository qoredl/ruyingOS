/**
 * @项目入口js
 * 代码稳定，一般改动不大
 * @date:2016-11-19
 * update:2017-3-9
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider,connect} from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Router, hashHistory} from 'react-router'
import { syncHistoryWithStore, routerReducer,routerMiddleware} from 'react-router-redux';
import { thunk, logger, } from '../lib/redux-middleware';
import routes from './routes';
import * as reducers from './store';

const ReactRedux={ Provider ,connect};

//应用react-router-redux 中间件，使其actionCreater可用，
// actionCreater单独在store文件夹内导入
const rMiddleware = routerMiddleware(hashHistory);

// 合成状态数据结构并导出。
const store = createStore(combineReducers({ ...reducers,routing: routerReducer }),applyMiddleware(thunk,rMiddleware, logger,));
const history = syncHistoryWithStore(hashHistory, store);

Object.assign(window, { React, ReactDOM ,ReactRedux});

ReactDOM.render(
		<Provider store={store}>
			<Router history={history} routes={routes}/>
		</Provider>, document.getElementById('r-root'));
