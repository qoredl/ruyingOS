import msg from './msg';
import arr from '../../var/arr';

/**
 * 全局路由类
 * date:2016-11-11
 * update:2016-11-19
 */
const defaults={
	/*在所有路由函数之间执行*/
	before() {
		//console.log('before!');
	},
	/*所有路由都会最后执行*/
	after() {
		//console.log('after!');
	},
	//路由不存在时执行
	error() {
		console.log(msg.erro404);
	}
};
	
export default class Routes{
	constructor(options) {
		this.routeConfig = Object.assign(defaults,options);
		this.routes = {};
		this.configure = {};
	}
	
	init() {
		for (let route of Object.keys(this.routeConfig)) {
			//处理特殊路由
			if (route === 'after') {
				this.configure.on = this.routeConfig.after;
				continue;
			}
			if (route === 'before') {
				this.configure.before = this.routeConfig.before;
				continue;
			}
			if (route === 'error') {
				this.configure.notfound = this.routeConfig.error;
				continue;
			}
			
			//处理正则路由
			if (route.indexOf('/') >= 0) {
				//const routeStr=route.slice(1,route.length-1);
				this.routes[route] = this.routeConfig[route];
				continue;
			}
			
			this.routes['/' + Routes.decamelCase(route)] = this.routeConfig[route];
		}
		
		const router = new Router(this.routes).configure(this.configure);
		
		router.init();
	}
	
	//驼峰式单词拆解成路由字符串
	static decamelCase(fnStr) {
		let routeStr = '';
		let routeArr = [];
		const constArr = [];
		const regUper = /[A-Z]/;
		
		arr.forEach.call(fnStr, function (item, i) {
			if (regUper.test(item)) {
				routeArr.push(i);
			}
			if (item === '$') {
				constArr.push(i);
			}
		});
		
		if (routeArr.length || constArr.length) {
			//解析变量路由
			if (constArr.length) {
				routeStr = Routes.parseRoutes(constArr, fnStr, '/:').replace(/\$/g, '');
				fnStr = routeStr;
			}
			
			//解析普通路由
			routeStr = Routes.parseRoutes(routeArr, fnStr, '/');
			
			return routeStr;
		}
		
		return fnStr;
	}
	
	//路由解析
	static parseRoutes(matchData, fnStr, jionChar) {
		let routeStr = '';
		
		routeStr += fnStr.slice(0, matchData[0]) + jionChar;
		//fnStr=fnStr.slice(matchData[0]);
		
		for (let [i,pos] of matchData.entries()) {
			if (i === matchData.length - 1) {
				routeStr += fnStr.slice(pos).toLowerCase();
			} else {
				routeStr += fnStr.slice(pos, matchData[i + 1]).toLowerCase() + jionChar;
			}
		}
		
		return routeStr;
	}
	
	static dispatchRouteChange(actionMaker) {
		reduxStore.dispatch(actionMaker(window.location.hash.slice(1)));
	}
}
