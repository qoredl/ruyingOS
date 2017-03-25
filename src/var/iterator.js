/**
 * iterator编历器扩展对象,为了兼容旧版手机浏览器
 */
export default {
	* [Symbol.iterator](){
		const len = this.length;
		let iteratorCounter = 0;
		
		while (iteratorCounter < len) {
			yield this[iteratorCounter++];
		}
	},
	
	* entries(){
		const len = this.length;
		let iteratorCounter = 0;
		
		while (iteratorCounter < len) {
			yield [iteratorCounter, this[iteratorCounter++]];
		}
	}
};