/**
 * user数据服务
 */
import { fetch, } from '../../lib/utils';
import server from '../config/Server';

const { headers, serverURL } = server;
const url=serverURL+'classes/';

/**
 * 获取模块初始数据
 */
export const getInitData = () => fetch(`${url}Home`, {
  headers,
});

/**
 * 添加数据
 * @param data
 */
export const addData = data => fetch(`${url}Home`, {
  headers,
  method: 'post',
  body: JSON.stringify(data)
});