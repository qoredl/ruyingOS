/**
 * users 用户数据逻辑
 * date:2017-3-11
 */

/*1.types********************************************************************************/
const USER_FETCH_START = 'USER_FETCH_START';
const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
const REG_SUCCESS = 'REG_SUCCESS';
const CHANG_USERINFO = 'CHANG_USERINFO';

/*2.reducer********************************************************************************/
const initState = {
	isFetching: false,//获取数据操作是否正在运行中
	isLogin: false,//是否已登录
	
	//用户信息
	userInfo: {
		username: '',
		password: ''
	},
};
export default (state = initState, action) => {
	switch (action.type) {
		case USER_FETCH_START:
			return {
				...state,
				isFetching: true,
			};
		case REG_SUCCESS:
			return {
				...state,
				isFetching: false,
				token: action.payload.sessionToken,
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

/*3.actions********************************************************************************/
export const userStartFetchAction = (payload) => ({ type: USER_FETCH_START, payload });
const signSuccessAction = payload => ({ type: REG_SUCCESS, payload });
const userFetchErrAction = () => ({ type: USER_FETCH_ERROR, error: true });

//修改用户名信息
export const changUserInfoAction = payload => ({ type: CHANG_USERINFO, payload, });

//注册新用户
/*export const signAction = (userInfo) => async dispatch => {
 dispatch(userStartFetchAction());
 dispatch(autoHideMsgAction('注册用户中...'));
 
 try {
 const data = await fetch(baseUrl + '_User', {
 headers,
 method: 'post',
 body: JSON.stringify(userInfo)
 });
 dispatch(signSuccessAction({ payload: data }));
 dispatch(autoHideMsgAction('注册用户成功！请登录。'));
 } catch (e) {
 dispatch(userFetchErrAction());
 dispatch(autoHideMsgAction(e.message));
 }
 };*/

//用户登录
/*export const loginAction = userInfo => async dispatch => {
 
 };*/

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

/*4.saga********************************************************************************/
import { showMsgTake } from './pub';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put,fork,cancel, } from 'redux-saga/effects';
import { fetch, } from '../../lib/Utils';
import { server } from '../config/index';

const { headers, baseUrl } = server;

//注册新用户
export function* signSaga() {
	yield* takeLatest(USER_FETCH_START, function* signTask(action) {
		let take=yield fork(showMsgTake, '注册用户中...');
		
		try {
			const data = yield call(fetch, baseUrl + '_User', {
				headers,
				method: 'post',
				body: JSON.stringify(action.payload)
			});
			
			yield put(signSuccessAction({ payload: data }));
			yield cancel(take);
			take=yield fork(showMsgTake, '注册用户成功！请登录。');
		} catch (e) {
			yield put(userFetchErrAction());
			yield cancel(take);
			yield fork(showMsgTake, e.message);
		}
	});
}