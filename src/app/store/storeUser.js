/**
 * user用户reducer
 * @date:2017-4-3
 */
import { guid } from '../../lib/utils';

//定义全属唯一的命名空间，可访止冲突与action分类，
const nameSpace = guid();

/**
 * 1.type
 * @type {string}
 */
export const START_LOGIN = 'START_LOGIN' + nameSpace;
export const START_REG = 'START_REG' + nameSpace;
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS' + nameSpace;

/**2.action***************************************************************
 * @param payload
 */
export const loginAction = (payload) => ({ type: START_LOGIN, payload });
export const regAction = (payload) => ({ type: START_REG, payload });
export const fetchUserSuccessAction = payload => ({ type: FETCH_USER_SUCCESS, payload });

/**3.reducer***************************************************************
 * @param payload
 */
const initState = {
  //用户信息
  userInfo: {
    username: '',
    password: ''
  },
};
export default (state = initState, action) => {
  //跳过系统action，如redux初始化，路由等action
  if (action.type.startsWith('@@')) {
    return state;
  }
  
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      const {
        objectId,
        username,
        sessionToken,
      } = action.payload;
      return {
        ...state,
        userInfo: { username, id: objectId, },
        token: sessionToken,
      };
    }
    
    default:
      return state;
  }
};