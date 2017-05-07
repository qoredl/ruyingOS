/**
 * user数据服务
 */
import { fetch, } from '../../lib/utils';
import { server } from '../config/index';

const { headers, serverURL } = server;
const url=serverURL+'classes/';

/**
 * 添加数据
 * @param data
 */
export const addData = data => fetch(`${url}Home`, {
  headers,
  method: 'post',
  body: JSON.stringify(data)
});

/**
 * 获取数据
 */
export const getData = () => fetch(`${url}Home`, {
  headers,
});