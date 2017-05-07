/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
import { renderToString } from 'react-dom/server'
import { Route} from 'react-router-dom';
import { StaticRouter } from 'react-router'
import { createStore, combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import pubState from './store/pubStore';
import homeState from './store/homeStore';
import Home from './Home';
import homeSaga from './store/homeSaga';
import createIndexHtml from './createIndexHtml';

Object.assign(global,{React});


const sagaMiddleware = createSagaMiddleware();

// 合成app store状态树,整个app只有一个store
let store = createStore(combineReducers({pubState,homeState}),applyMiddleware(sagaMiddleware,));

//运行首页
sagaMiddleware.run(homeSaga, store.getState);

//生成路由组件
const htmlStr=renderToString(
    <Provider store={store}>
      <StaticRouter location={'/'} context={{}}>
        <Route render={()=><Home/>}/>
      </StaticRouter>
    </Provider>);

//


//console.log(store.getState(),'/n',htmlStr);

export default createIndexHtml(store.getState(),htmlStr);
