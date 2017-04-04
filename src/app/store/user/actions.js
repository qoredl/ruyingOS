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


export const userStartFetchAction = (payload) => ({ type: USER_FETCH_START, payload });
export const signSuccessAction = payload => ({ type: REG_SUCCESS, payload });
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