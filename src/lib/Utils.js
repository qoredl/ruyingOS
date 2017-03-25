/**
 * @工具函数库
 * @date:2016-5-14
 */
import dom from '../var/dom';
import support from '../var/support';
import animations from '../var/animation-name';
/*SHA1加密*/
import IndexDB from '../lib/IndexDB';
import 'whatwg-fetch';//fetch polyfill

/*生成封装过的indexedDB操作类实例
 * 可对indexedDB进行系列操作，具体请看IndexDB类使用说明
 * */
const indexDB = dbName=>new IndexDB(dbName);

/**
 * fetch异部获取数据
 * 使用时注意：
 * 1.是否需要设置请求头headers　'Content-Type':'application/x-www-form-urlencoded',
 * 2.发送数据body是否需要序列化，可以使用param方法
 * @param url {String}
 * @param opts [Object]
 */
const fetch = (url, opts = {})=>window.fetch(url, Object.assign({ method: 'get' }, opts))
		.then(response => {
			if (200 <= response.status && response.status < 300) {
				if (opts.type === 'text') {
					return response.text();
				}
				
				return response.json();
			} else {
				const err = new Error(response.statusText);
				err.response = response;
				
				throw err;
			}
		});

/**
 * 生成随机字符串
 * @param len　[number=32]
 * @returns {string}
 */
const randomStr = (len = 42)=> {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let str = '';
	
	for (; len > 0; len--) {
		str += chars.charAt(Math.trunc(Math.random() * chars.length));
	}
	
	return str;
};

/**
 * 检测数据类型
 * @param obj
 * @returns {string}
 */
const type = obj=> {
	//null,undefinded
	if (obj == null) {
		return obj + "";
	}
	
	let type = typeof obj;
	
	if (type === 'object') {
		type = Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase();
	}
	
	return type;
};

/**
 * 对象参数序列化
 * @param obj {Object}
 * @returns {string}
 */
const param = obj=> {
	const returnData = [];
	
	// If an array was passed in, assume that it is an array of form elements.
	if (Array.isArray(obj) || !isPlainObject(obj)) {
		// Serialize the form elements
		for (let item of obj) {
			add(item.name, item.value, returnData);
		}
	} else {
		// If traditional, encode the 'old' way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for (let key of Object.keys(obj)) {
			buildParams(key, obj[key], add, returnData);
		}
	}
	
	// Return the resulting serialization
	return returnData.join('&');
};

/**
 * 函数节流生成器
 * 应用场景：鼠标移动，mousemove事件；DOM元素动态定位，window对象的resizet和scroll事件
 * @param fn [Function] -节流函数
 * @param delay {Number} - 控制函数连续调用的频率
 * @returns {Function}
 */
const throttle = (fn, delay)=> {
	let timer = null;
	
	return function (...arg) {
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, arg);
		}, delay);
	}
};

/**
 * 高频执行函数防抖生成器，
 * @param fn {function} - 绑定需要防抖函数
 * @param wait {Number} -空闲时间间隔，空闲时间必须大于或等于此值时才会执行调用函数
 * @param immediate [Boolean] - 无此参数或此参数为false时，执行函数在空闲时间间隔之后执行；相反刚在之前执行。
 * @returns {Function}
 */
const debounce = (fn, wait, immediate)=> {
	let timeout;
	
	return function (...args) {
		clearTimeout(timeout);
		
		if (immediate && !timeout) {
			fn.apply(this, args);
		}
		
		timeout = setTimeout(() => {
			timeout = null;
			if (!immediate) {
				fn.apply(this, args);
			}
		}, wait);
	};
};

/**
 * 纯对象判断
 * @param obj
 * @returns {*|boolean}
 */
const isPlainObject = obj=>obj.constructor && obj.constructor.name === 'Object' && obj.constructor.prototype.hasOwnProperty('hasOwnProperty');

/**
 * 解析字符串形式的对象为js对象，如：{name:'ruying'}
 * @param optsStr {String}
 * @returns {*}
 */
const parseOptions = optsStr=> {
	if (optsStr) {
		try {
			return (new Function('return JSON.parse(JSON.stringify(' + optsStr + '));'))();
		} catch (e) {
			throw e;
		}
	}
};

/**
 * 生成唯一id值
 * @param prfix [String='r']
 * @returns {string}
 */
let id = 0;
const guid = (prfix = 'r')=> `${prfix}-${+(new Date()) + id++}`;

/**
 * 添加css3动画
 * @param target {HTMLElement}
 * @param flassName {String}
 * @param type [String='in']
 * @param isHidden [Boolean=0]
 * @param callBack {Function}
 */
const addFlass = (target, { flassName, type = 'in', isHidden = false }, callBack)=> {
	type === 'in' && target.removeAttribute('hidden');
	target.classList.add(animations.name);
	target.classList.add(flassName);
	
	target.addEventListener(support.animationend, eventHandler, false);
	
	function eventHandler(e) {
		const thisElment = e.target;
		
		thisElment.classList.remove(flassName);
		isHidden && thisElment.setAttribute('hidden', 'hidden');
		callBack && callBack();
		thisElment.removeEventListener(support.animationend, eventHandler, false);
	}
};

/**
 * 返回绝对网址，即完整网址
 * @see https://davidwalsh.name/get-absolute-url
 * @param url [String='']
 * @returns {String}
 */
const getAbsoluteUrl = (url = '')=> {
	const a = dom.createElement('a');
	a.href = url;
	return a.href;
};

/**
 * 中划线形式单词转换为驼峰式单词
 * @param str {String}
 * @returns {String}
 */
const camelCase = str=> {
	str = str.toLowerCase();
	
	const keyArr = str.split('-');
	
	if (keyArr.length === 1) {
		return str;
	}
	
	return keyArr.reduce((prevItem, nextItem) => prevItem + nextItem.charAt(0).toLocaleUpperCase() + nextItem.slice(1));
};

/**
 * 复制除了:constructor,prototype,name外自身属性
 * 与Object.assign区别：Object.assign拷贝的是对象自身的可枚举属性,而本方法拷贝的是除constructor,prototype,name外所有自身属性
 * @param target
 * @param source
 */
const copyOwnKeys = (target, source)=> {
	for (let key of Reflect.ownKeys(source)) {
		if (!(key === 'constructor' && key === 'prototype' && key === 'name')) {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);
		}
	}
};

/**
 * Mixin模式
 * 将多个类的接口“混入”（mix in）另一个类
 * 可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
 * @param mixins {Class}-多个class类
 * @returns {Mix}
 */
const mix = (...mixins)=> {
	class Mix {
	}
	
	for (let mixin of mixins) {
		copyOwnKeys(Mix, mixin);
		copyOwnKeys(Mix.prototype, mixin.prototype);
	}
	
	return Mix;
};

export {
		indexDB,
		fetch,
		randomStr,
		type,
		param,
		throttle,
		debounce,
		isPlainObject,
		parseOptions,
		guid,
		addFlass,
		getAbsoluteUrl,
		camelCase,
		//cssTest,
		copyOwnKeys,
		mix,
};

/*param辅助函数*/
function add(key, valueOrFunction, data) {
	// If value is obj function, invoke it and use its return value
	const value = typeof valueOrFunction === 'function'
			? valueOrFunction(): valueOrFunction;
	
	data.push(encodeURIComponent(key) + '=' + encodeURIComponent(value === null ? '': value));
}

function buildParams(key, value, add, data) {
	const isBracket = /[]$/.test(key);
	
	if (Array.isArray(value)) {
		// Serialize array navs.
		// 序列化数组项
		for (let [i, v] of value.entries()) {
			if (isBracket) {
				// Treat each array navs as a scalar.
				add(key, v, data);
			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(key + '[' + (typeof v === 'object' && v !== null ? i: '') + ']', v, add, data);
			}
		}
	} else if (typeof value === 'object' && value !== null) {
		// Serialize object navs.
		for (let name of Object.keys(value)) {
			buildParams(key + '[' + name + ']', value[name], add, data);
		}
	} else {
		// Serialize scalar navs.
		add(key, value, data);
	}
}
