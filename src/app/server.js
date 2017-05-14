/**
 * @app入口js
 * 稳定性：3
 * @date:2016-11-19
 */
import React from 'react';
console.log(React);
Object.assign(global, { React });

import { renderToString } from 'react-dom/server'
import { Route, Switch} from 'react-router-dom';
import { StaticRouter } from 'react-router'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import pubState from './store/pubStore';
import homeState from './store/homeStore';
import createHtml from './createIndexHtml';
import createRoutesConfig from './createRoutesConfig'
import createSagaMiddleware from 'redux-saga';

// 合成app store状态树,整个app只有一个store
let store = createStore(combineReducers({ pubState, homeState }));

//生成路由组件
const sagaMiddleware = createSagaMiddleware();
const routesConfig = createRoutesConfig({ store, sagaMiddleware, combineReducers, pubState,isSever:1});

//生成路由组件
const renderComps = url => {
  console.log(routesConfig.map((config, i) => <Route key={i} {...config}/>));
  
  return renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <Switch>
           {routesConfig.map((config, i) => <Route key={i} {...config}/>)}
            
            {/*<Route exact path="/" render={()=><div>index</div>}/>
            <Route path="/user" render={()=><div>user</div>}/>
            <Route render={()=><div>err</div>}/>*/}
           </Switch>
        </StaticRouter>
      </Provider>);
};



export default createHtml(store.getState(), renderComps,routesConfig);
