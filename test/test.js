export default class IndexDB {
	constructor(dbName) {
		this.indexDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		
		console.log('stst');
		
		//存储打开过的db对象，用于操作完后关闭对应数据库
		//this.db = {curDb:dbName};
	}
	
	f(){
		console.log('stst');
	}
}