/**
 * user用户actions
 * date:2017-4-3
 */
import {
  USER_FETCH_START,
  USER_FETCH_ERROR,
  REG_SUCCESS,
  CHANG_USERINFO,
} from '../pub/type';

//开始fetch用户相关数据
export const userStartFetchAction = (payload) => ({ type: USER_FETCH_START, payload });

//注册成功
export const signSuccessAction = payload => ({ type: REG_SUCCESS, payload });

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