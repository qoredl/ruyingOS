/**
 * user用户actions
 * date:2017-4-3
 */

/*1.types********************************************************************************/
export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const REG_SUCCESS = 'REG_SUCCESS';
export const CHANG_USERINFO = 'CHANG_USERINFO';

/*3.actions********************************************************************************/
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