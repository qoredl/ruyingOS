/**
 * user数据服务
 */
import { fetch, } from '../../lib/Utils';
import { server } from '../config/index';

const { headers, serverURL } = server;

/**
 * 添加用户
 * @param userInfo
 */
export const addUser = userInfo => fetch(`${serverURL}users`, {
  headers,
  method: 'post',
  body: JSON.stringify(userInfo)
});

/**
 * 用户登录
 * @param username
 * @param password
 */
export const login = ({username,password}) => fetch(`${serverURL}login?username=${username}&password=${password}`, {
  headers,
});