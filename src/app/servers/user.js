/**
 * user数据服务
 */
import { fetch, } from '../../lib/Utils';
import { server } from '../config/index';

const { headers, baseUrl } = server;

export const addUser=userInfo=>fetch(baseUrl + '_User', {
	headers,
	method: 'post',
	body: JSON.stringify(userInfo)
});