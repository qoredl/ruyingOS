/**
 * 首页用户reducer
 * @date:2017-4-23
 */
import {guid} from '../../lib/utils';

//定义全属唯一的命名空间，可访止冲突与action分类，
const nameSpace=guid();

/**
 * 1.type
 * @type {string}
 */
export const FETCH_DATA = 'FETCH_DATA'+nameSpace;
export const ADD_DATA = 'ADD_DATA'+nameSpace;


/**2.action***************************************************************
 * @param payload
 */
export const fetchDataAction = (payload) => ({ type: FETCH_DATA, payload });
export const addDataAction = () => ({ type: ADD_DATA});

/**3.reducer***************************************************************
 * @param payload
 */
const initState = {a:'test'};
export default (state = initState, action) => {
  //跳过系统action，如redux初始化，路由等action
  if (action.type.startsWith('@@')) {
    return state;
  }
  
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data:action.payload,
      };
      
    default:
      return state;
  }
};