class Ajax {
	constructor() {
		const xhr = new XMLHttpRequest();
		
		if (xhr === undefined || xhr === null) {
			throw new Error('XMLHttpRequest对象创建失败！！');
		}
		
		this.xhr = xhr;
	}
	
	/**
	 * ajax请求核心方法
	 * @param type
	 * @param url
	 * @param headers
	 * @param dataType
	 * @param data
	 * @param timeout
	 * @returns {*}
	 */
	send({ type='get', url, headers, dataType='json', data=null, timeout=3000 }) {
		if (this.xhr === undefined && this.xhr === null) {
			throw new Error('XMLHttpRequest对象创建失败，无法发送数据！');
		}
		
		type = type.toUpperCase();
		
		if (type !== "GET" && type !== "POST" && type !== 'PUT' && type !== 'DELETE') {
			throw new Error('HTTP的请求方法必须为GET、POST、PUT或DELETE!!!');
		}
		
		if (url === null || url === undefined) {
			throw new Error('HTTP的请求地址必须设置！');
		}
		
		this.xhr.timeout = timeout;
		if (!this.xhr.responseType) {
			this.xhr.responseType = dataType;
		}
		
		this.xhr.open(type, url, true);
		this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.setHeaders(headers);
		
		if (data === null) {
			this.xhr.send(null);
		}else {
			this.xhr.send(Ajax.param(data));
		}
		
		return this.getData(this.xhr, headers);
	}
	
	setHeaders(headers) {
		if (!headers) {
			return;
		}
		
		for (let key of Object.keys(headers)) {
			this.xhr.setRequestHeader(key, headers[key]);
		}
	}
	
	getData(xhr, headers) {
		const p = new Promise((resolve, reject)=> {
			xhr.onreadystatechange = ()=> {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(xhr.response);
					} else {
						reject({
							status: xhr.status,
							statusText: xhr.statusText
						});
					}
				}
			};
			
			xhr.ontimeout = ()=> {
				reject('请求超时！');
			};
		});
		
		return p;
	}

	/**
	 * 对象序列化
	 * @param obj {Object}
	 * @returns {string}
	 */
	static param(obj){
		let paramStr = '';
		for (let key of Object.keys(obj)) {
			//第一对键值
			if (!paramStr) {
				paramStr += key + '=' + obj[key];
			}else {
				paramStr += '&' + key + '=' + obj[key];
			}
		}

		return paramStr;
	}
	
	/*abort() {
	 this.xhr.abort();
	 }*/
}

const ajax = new Ajax();
export default ajax.send.bind(ajax);

