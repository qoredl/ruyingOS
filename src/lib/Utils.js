/**
 * @工具函数库
 * @date:2016-5-14
 */
import hasOwn from '../var/hasOwnProperty';
import dom from '../var/dom';
import body from '../var/body';
//import 'whatwg-fetch';//fetch polyfill;

/**
 * fetch异部获取数据
 * 使用时注意：
 * 1.是否需要设置请求头headers　'Content-Type':'application/x-www-form-urlencoded',
 * 2.发送数据body是否需要序列化，可以使用param方法
 * @param url {String}
 * @param opts [Object]
 */
export const fetch = (url, opts = {}) => window.fetch(url, Object.assign({ method: 'get' }, opts))
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
export const randomStr = (len = 42) => {
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
export const type = obj => {
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
 * 纯对象判断
 * @param obj
 * @returns {*|boolean}
 */
export const isPlainObject = obj => obj.constructor && obj.constructor.name === 'Object' && obj.constructor.prototype.hasOwnProperty('hasOwnProperty');

/**
 * 对象参数序列化
 * @param obj {Object}
 * @returns {string}
 */
export const param = obj => {
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
};

/**
 * 函数节流生成器
 * 应用场景：鼠标移动，mousemove事件；DOM元素动态定位，window对象的resizet和scroll事件
 * @param fn [Function] -节流函数
 * @param delay {Number} - 控制函数连续调用的频率
 * @returns {Function}
 */
export const throttle = (fn, delay) => {
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
export const debounce = (fn, wait, immediate) => {
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
 * 解析字符串形式的对象为js对象，如：{name:'ruying'}
 * @param optsStr {String}
 * @returns {*}
 */
export const parseOptions = optsStr => {
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
export const guid = (prfix = 'r') => `${prfix}-${+(new Date()) + id++}`;

/**
 * 返回绝对网址，即完整网址
 * @see https://davidwalsh.name/get-absolute-url
 * @param url [String='']
 * @returns {String}
 */
const getAbsoluteUrl = (url = '') => {
	const a = dom.createElement('a');
	a.href = url;
	return a.href;
};

/**
 * 中划线形式单词转换为驼峰式单词
 * @param str {String}
 * @returns {String}
 */
export const camelCase = str => {
	str = str.toLowerCase();
	
	const keyArr = str.split('-');
	
	if (keyArr.length === 1) {
		return str;
	}
	
	return keyArr.reduce((prevItem, nextItem) => prevItem + nextItem.charAt(0).toLocaleUpperCase() + nextItem.slice(1));
};

/**
 * A simple javascript utility for conditionally joining classNames together.
 * http://jedwatson.github.io/classnames
 * @returns {string}
 */
const classnames = (...args) => {
	const classes = [];
	
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (!arg) continue;
		
		const argType = typeof arg;
		
		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			classes.push(classnames.apply(null, arg));
		} else if (argType === 'object') {
			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}
	
	return classes.join(' ');
};

/**
 * 测量滚动条宽度
 * Measure scrollbar width for padding body during modal show/hide
 * https://github.com/react-component/table/blob/master/src/utils.js
 * @returns {*}
 */
let scrollbarWidth;
const scrollbarMeasure = {
	position: 'absolute',
	top: '-9999px',
	width: '50px',
	height: '50px',
	overflow: 'scroll',
};
export function measureScrollbar() {
	if (typeof dom === 'undefined' || typeof window === 'undefined') {
		return 0;
	}
	
	if (scrollbarWidth) {
		return scrollbarWidth;
	}
	
	const scrollDiv = dom.createElement('div');
	
	for (const scrollProp in scrollbarMeasure) {
		if (hasOwn.call(scrollbarMeasure,scrollProp)) {
			scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
		}
	}
	body.appendChild(scrollDiv);
	scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	body.removeChild(scrollDiv);
	
	return scrollbarWidth;
}

/**
 * delay
 * 返回一个 Promise，这个 Promise 将在 time 秒后 resolve
 * @param time
 */
export const delay = time => new Promise(resolve => setTimeout(resolve, time));
