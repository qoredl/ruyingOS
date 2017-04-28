/**
 * user用户reducer
 * @date:2017-4-3
 */
import {
  START_LOGIN,
  START_REG,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CHANG_USERINFO,
} from '../pub/type';

const initState = {
  isFetching: false,//是否正在获取数据
  isLogin: false,//是否已登录
  
  //用户信息
  userInfo: {
    username: '',
    password: ''
  },
};
export default (state = initState, action) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isFetching: true,
      };
  
    case START_REG:
      return {
        ...state,
        isFetching: true,
      };
      
    case FETCH_USER_SUCCESS:
      const {
        objectId,
        username,
        sessionToken,
      }=action.payload;
      return {
        ...state,
        isFetching: false,
        userInfo:{username,id:objectId,},
        token: sessionToken,
      };
      
    case FETCH_USER_ERROR:
      return {
        ...state,
        isFetching: false
      };
      
    case CHANG_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
      
    default:
      return state;
  }
};