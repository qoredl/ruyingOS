//iterator编历器扩展对象,为了兼容旧版手机浏览器
export default {
	/*[Symbol.iterator](){
		const self=this;
		const len=this.length;
		this.iteratorCounter=0;
		return {
			next(){
				if (self.iteratorCounter<len) {
					return{value:self[self.iteratorCounter++],done:false};
				}

				return {done:true};
			},

			return() {
				return { done: true };
			}
		};
	}*/

	//使用generator实现
	* [Symbol.iterator](){
		const len=this.length;
		let iteratorCounter=0;

		while (iteratorCounter<len){
			yield this[iteratorCounter++];
		}
	},
	
	* entries(){
		const len=this.length;
		let iteratorCounter=0;
		
		while (iteratorCounter<len){
			yield [iteratorCounter,this[iteratorCounter++]];
		}
	}
};