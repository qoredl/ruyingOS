/**
 * user用户actions
 * date:2017-4-3
 */
import {
  START_LOGIN,
  START_REG,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  CHANG_USERINFO,
} from '../pub/type';

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