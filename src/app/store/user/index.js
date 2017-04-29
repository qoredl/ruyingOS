/**
 * user用户reducer
 * @date:2017-4-3
 */
import {guid} from '../../../lib/utils'

/**
 * 1.type
 * @type {string}
 */
export const START_LOGIN = 'START_LOGIN'+guid();
export const START_REG = 'START_REG'+guid();
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'+guid();
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'+guid();
export const CHANG_USERINFO = 'CHANG_USERINFO'+guid();


/**2.action***************************************************************
 * @param payload
 */
//用户登录
export const loginAction = (payload) => ({ type: START_LOGIN, payload });
//登录成功
export const loginSuccessAction = payload => ({ type: FETCH_USER_SUCCESS, payload });
//用户注册
export const regAction = (payload) => ({ type: START_REG, payload });
//注册成功
export const signSuccessAction = payload => ({ type: FETCH_USER_SUCCESS, payload });
//fetch用户相关数据出错
export const fetchUserErrAction = () => ({ type: FETCH_USER_ERROR, error: true });
//修改用户名信息
export const changUserInfoAction = payload => ({ type: CHANG_USERINFO, payload, });


/**3.reducer***************************************************************
 * @param payload
 */
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