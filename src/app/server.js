/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
import { renderToString } from 'react-dom/server'
import { Route} from 'react-router-dom';
import { StaticRouter } from 'react-router'
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import pubState from './store/pubStore';
import homeState from './store/homeStore';
import Home from './Home';
import createHtml from './createIndexHtml';

Object.assign(global,{React});

// 合成app store状态树,整个app只有一个store
let store = createStore(combineReducers({pubState,homeState}));

//生成路由组件
const renderComps=url=>renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <Route render={()=><Home/>}/>
      </StaticRouter>
    </Provider>);

export default createHtml(store.getState(),renderComps);
