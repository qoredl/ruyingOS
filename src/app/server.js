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
import pubState from './store/pub';
import homeState from './store/home';
import Home from './Home';
import createIndexHtml from './createIndexHtml';

Object.assign(global,{React});


//应用react-router-redux routerMiddleware中间件，
//使其中的push,replace,go,goBack,goForward的actionCreater可用，

// 合成app store状态树,整个app只有一个store
let store = createStore(combineReducers({pubState,homeState}));

//生成路由组件
const htmlStr=renderToString(
    <Provider store={store}>
      <StaticRouter location={'/'} context={{}}>
        <Route render={()=><Home/>}/>
      </StaticRouter>
    </Provider>);

console.log(store.getState(),'/n',htmlStr);

export default createIndexHtml(store.getState(),htmlStr);
