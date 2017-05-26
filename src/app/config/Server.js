/**
 * app数据请求相关配置
 * date:2016-9-9
 */
import config from '../../../config';

const { appId, restAPIKey, masterKey, serverURL } = config;
const baseHeaders = { 'Content-Type': 'application/json' };

/*1.本地parse server，默认headers*/
const headers = Object.assign(baseHeaders, {
  'Content-Type': 'application/json',
  'X-Parse-Application-Id': appId,
  'X-Parse-REST-API-Key': restAPIKey,
  'X-Parse-Master-Key': masterKey
});
export default {
  headers,
  serverURL,
};
