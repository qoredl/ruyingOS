/**
 * user用户actions
 * date:2017-4-3
 */
import {
  LOGIN_START,
  REG_START,
  USER_FETCH_ERROR,
  REG_SUCCESS,
  CHANG_USERINFO,
} from '../pub/type';

//用户登录
export const loginAction = (payload) => ({ type: LOGIN_START, payload });

//注册成功
export const signSuccessAction = payload => ({ type: REG_SUCCESS, payload });

//用户注册
export const regAction = (payload) => ({ type: REG_START, payload });

//登录成功
export const loginSuccessAction = payload => ({ type: REG_SUCCESS, payload });

//fetch用户相关数据出错
export const userFetchErrAction = () => ({ type: USER_FETCH_ERROR, error: true });

//修改用户名信息
export const changUserInfoAction = payload => ({ type: CHANG_USERINFO, payload, });

//注册新用户
/*
 
 //查询用户
 /*const queryAction = (storeName, queryKey, query) => async (dispatch, getState) => {
 //dispatch(fetchStartAction());
 
 try {
 const data = await fetch(baseUrl + storeName + '?' + queryKey + '=' + encodeURIComponent(JSON.stringify(query)), { headers });
 //dispatch(fetchYesAction(data));
 } catch (e) {
 //dispatch(fetchErrAction(e.message));
 }
 };*/