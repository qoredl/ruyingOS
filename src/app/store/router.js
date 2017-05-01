/**
 * 路由reducer
 * 扩展react-router-redux中的routerReducer
 * @date:2017-5-1
 */
import {combineReducers} from 'redux';
import rx,{ routerReducer} from 'react-router-redux';

console.log(rx);

const param=(state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({routerReducer,param});

