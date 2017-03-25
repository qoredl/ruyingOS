/**
 * app请求验证headers
 * date:2016-9-9
 * update:2016-11-30
 */

/*ApiCloud*/
/*import {SHA1} from '../../../lib/Utils';
const now = Date.now();
const appId = ' A6910422456681';
const appKey = SHA1(appId + "UZ" + "D6C19129-05B8-B58F-3BC8-D378189132D2" + "UZ" + now) + "." + now;

export default{
	'Content-Type':'application/x-www-form-urlencoded',
	'X-APICloud-AppId': appId,
	'X-APICloud-AppKey': appKey
}*/

/*maxleap*/
/*const appId = '57f7c08ea160020007e060ca';
const appKey ='QmNUU2ZCekhOd2EyNG02ZFVwdlJGUQ';
export default{
	'Content-Type': 'application/json',
	'X-ML-AppId': appId,
	'X-ML-APIKey':appKey
	//'X-ML-APIKey': appKey
}*/

/*leancloud*/
/* const appId = 'L9Tq1rsolyMrWcwzswoNl4ee-gzGzoHsz';
 const appKey ='qC5N4EVoXky2CGS38Sj3g0JJ';
 
 export default{
 'Content-Type': 'application/json',
 'X-LC-Id': appId,
 'X-LC-Key':appKey
 //'X-ML-APIKey': appKey
 }*/


import config from '../../../config';

const {appId,restAPIKey,masterKey,serverURL}=config;
const baseHeaders={'Content-Type': 'application/json'};

/*1.本地parse server，默认headers*/
const headers=Object.assign(baseHeaders,{
	'Content-Type': 'application/json',
	'X-Parse-Application-Id': appId,
	'X-Parse-REST-API-Key':restAPIKey,
	'X-Parse-Master-Key':masterKey
});
export default {
	headers,
	baseUrl:serverURL+'/classes/',
};
