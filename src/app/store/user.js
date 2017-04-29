/**
 * user用户reducer
 * @date:2017-4-3
 */
import {guid} from '../../lib/utils'

/**
 * 1.type
 * @type {string}
 */
export const START_LOGIN = 'START_LOGIN'+guid();
export const START_REG = 'START_REG'+guid();
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'+guid();


/**2.action***************************************************************
 * @param payload
 */
export const startLoginAction = (payload) => ({ type: START_LOGIN, payload });
export const startRegAction = (payload) => ({ type: START_REG, payload });
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
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      const {
        objectId,
        username,
        sessionToken,
      }=action.payload;
      return {
        ...state,
        userInfo:{username,id:objectId,},
        token: sessionToken,
      };
      
    default:
      return state;
  }
};