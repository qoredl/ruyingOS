/**
 * user用户reducer
 * date:2017-4-3
 */
import {
  LOGIN_START,
  REG_START,
  REG_SUCCESS,
  USER_FETCH_ERROR,
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
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
      };
  
    case REG_START:
      return {
        ...state,
        isFetching: true,
      };
      
    case REG_SUCCESS:
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
      
    case USER_FETCH_ERROR:
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