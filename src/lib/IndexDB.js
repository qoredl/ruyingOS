/**
 * @indexDB　浏览器对象存储数据库类
 * 相关资料：
 * 1.http://www.cnblogs.com/jscode/archive/2013/06/15/3583089.html
 * 2.http://www.cnblogs.com/dolphinX/p/3415761.html
 * @date:2016-7-6
 * @version:1.1.0
 * update:2016-10-30
 */
export default class IndexDB {
	constructor(dbName) {
		this.indexDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

		//存储打开过的db对象，用于操作完后关闭对应数据库
		this.db = {curDb:dbName};
	}

	/**
	 * 打开数据库
	 * @param dbName
	 * @param version
	 * @param callback
	 * @returns {Promise.<TResult>}
	 */
	open(dbName=this.db.curDb, version, callback) {
		console.log('opening the IndexDB!');
		
		const request = this.indexDB.open(dbName, version);
		let p1 = Promise.resolve();

		//第一次打开或数据库版本号发生变化时触发事件
		if (callback) {
			p1 = new Promise(resolve=> {
				request.onupgradeneeded = e=> {
					resolve(callback(e.target.result));
				};
			});
		}

		const p2 = new Promise((resolve, reject)=> {
			//打开失败
			request.onerror = e=> {
				const error = e.target.error;
				reject({ code: error.code, msg: error.message, name: error.name });
			};

			// 如果用户已经在一个标签页中打开了你的应用的旧版本的数据库，
			// 然后他又在另一个标签页中加载了你的应用的新版本，这种情况下会触发blocked事件。
			// 当你带着比数据库实际版本更高的版本号调用 open() 时，
			// 所有其他打开的数据库必须在你开始实际对数据库进行修改之前显式通知这个请求。
			request.onblocked = (e)=>{
				reject({ code: 0, msg: '旧版本的数据库未关闭！', name: e.type });
			};

			//打开成功
			request.onsuccess = e=> {
				const db = e.target.result;

				//保存数据库引用
				if (!this.db[dbName]) {
					this.db[dbName] = db;
					this.db[dbName].isOpen = true;
					this.db.curDb=dbName;
					this.db.version=db.version;
				}
				resolve(db);
			};
		});

		return Promise.all([p1, p2]).then(results=> {
			if (callback) {
				return results[0];
			}
			
			return results[1];
		});
	}

	/**
	 * 升级数据库
	 * 第一次打开或数据库版本号发生变化时才有效
	 * 用来添加或删除对象仓库
	 * @param store
	 * @param dbName
	 * @returns {Promise<U>|Promise.<TResult>|Thenable<U>}
	 */
	updateStroe(store,dbName=this.db.curDb) {
		const updateFn = db=> {
			db.close();
			
			return this.open(dbName, ++this.db.version, db=> {
				if (typeof store === 'string') {
					//删除单个仓库操作
					if (db.objectStoreNames.contains(store)) {
						const objectStore = db.deleteObjectStore(store);
						return Promise.resolve({ code: 100, msg: `对象仓库:${store}删除成功!`, name: 'DelStroreSuccess' });
					}

					//删除单个仓库失败提示信息
					return Promise.reject({ code: 0, msg: `对象仓库${store}不存在!`, name: 'DelStroreError' });
				}

				if (Array.isArray(store)) {
					//批量删除仓库操作
					if (typeof store[0]==='string') {
						let msg = [];
						
						for (let storeName of store) {
							if (db.objectStoreNames.contains(storeName)) {
								db.deleteObjectStore(storeName);
								msg.push({code:100,msg:`对象仓库:${storeName}删除成功!`,name:'DelStroerSuccess'});
							} else {
								msg.push({code:0,msg:`对象仓库:${storeName}不存在!`,name:'DelStroerError'});
							}
						}

						return Promise.resolve(msg);
					}

					//批量添加仓库操作
					let msg = [];

					for (let { storeName, keyPath,index} of store) {
						if (!db.objectStoreNames.contains(storeName)) {
							let objectStore;

							if (keyPath) {
								//指定健名，后续添加文档对象时必需指定键值keyPath
								objectStore=db.createObjectStore(storeName, { keyPath });
							}else {
								//不指定健名，自动生成递增键值，后续添加文档对象不必指定键值
								objectStore=db.createObjectStore(storeName, {autoIncrement: true});
							}

							//添加索引
							if (index) {
								const [indexName,indexPro,unique]=index;

								//设置多个索引值
								if (Array.isArray(indexName)) {
									for(let [indexName,indexPro,unique] of index){
										objectStore.createIndex(indexName,indexPro,{unique});
									}
								}else {
									//只设置单个索引
									objectStore.createIndex(indexName,indexPro,{unique});
								}
							}
							
							msg.push({code:100,msg:`对象仓库:${storeName}创建成功!`,name:'AddStroreSuccess'});
						} else {
							msg.push({code:0,msg:`对象仓库:${storeName}已存在!`,name:'AddStroreError'});
						}
					}
					
					return Promise.resolve(msg);
				}

				//添加单个仓库操作
				if (!db.objectStoreNames.contains(store.storeName)) {
					let objectStore;

					if (store.keyPath) {
						//指定健值，后续添加文档对象时必需指定键值keyPath
						objectStore=db.createObjectStore(store.storeName, { keyPath: store.keyPath })
					}else {
						//不指定健值，自动生成递增键值，后续添加文档对象不必指定键值
						objectStore=db.createObjectStore(store.storeName, {autoIncrement: true})
					}

					//添加索引
					const index=store.index;
					
					if (index) {
						const [indexName,indexPro,unique]=index;

						//设置多个索引值
						if (Array.isArray(indexName)) {
							for(let [indexName,indexPro,unique] of index){
								objectStore.createIndex(indexName,indexPro,{unique});
							}
						}else {
							//只设置单个索引
							objectStore.createIndex(indexName,indexPro,{unique});
						}
					}
					
					return Promise.resolve({ code: 100, msg: `对象仓库:${store.storeName}创建成功!`, name: 'AddStroreSuccess' });
				}

				//添加单个仓库失败提示信息
				return Promise.reject({ code: 0, msg: `对象仓库:${store.storeName}已存在!`, name: 'AddStroreError' });
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return updateFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return updateFn(db);
		});
	}

	/**
	 * 添加文档对象数据
	 * @param dbName
	 * @param storeName
	 * @param data
	 * @returns {Promise.<TResult>}
	 */
	add(storeName, data,dbName=this.db.curDb) {
		const addFn = db=> {
			const transaction = db.transaction([storeName], "readwrite");
			let addObjextStroe;

			if (Array.isArray(data)) {
				for (let d of data) {
					addObjextStroe=transaction.objectStore(storeName).add(d);
				}
			} else {
				addObjextStroe=transaction.objectStore(storeName).add(data);
			}

			return new Promise((resolve, reject)=> {
				//添加数据成功
				addObjextStroe.onsuccess = e=> {
					resolve({ code: 100, msg: '添加数据成功!', name: 'AddObjectSuccess' });
				};

				//添加数据失败
				addObjextStroe.onerror= e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};

				//事务出错
				/*transaction.onerror = e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};*/

				//事务中断
				/*transaction.abort = e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};*/
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return addFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return addFn(db);
		});
	}

	/**
	 * 获取对象数据
	 * @param dbName
	 * @param storeName
	 * @param key
	 * @returns {Promise.<TResult>}
	 */
	getBykey(storeName, key,dbName=this.db.curDb) {
		const getFn = db=> {
			const request = db.transaction([storeName], "readonly").objectStore(storeName).get(key);

			return new Promise((resolve, reject)=> {
				//获取数据成功
				request.onsuccess = e=> {
					if (request.result) {
						resolve(request.result);
					} else {
						reject({ code: 0, msg: `数据不存在!`, name: 'GetObjectError' });
					}
				};

				//获取数据失败
				request.onerror = e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return getFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return getFn(db);
		});
	}

	/**
	 * 获取仓库所有数据或按筛选条件获取数据
	 * @param storeName
	 * @param rang
	 * @param dbName
	 * @returns {Promise<U>|Thenable<U>|Promise.<TResult>}
	 */
	get(storeName,rang,dbName=this.db.curDb){
		const getFn = db=> {
			const objectStore=db.transaction([storeName], "readonly").objectStore(storeName);
			let cursor;

			if (rang) {
				const filterKey=Object.keys(rang)[0];
				const filterRang=rang[filterKey];

				//检测是否创建了对应索引
				if (!objectStore.indexNames.contains(filterKey)) {
					throw new Error('仓库中未创建对应的索引！')
				}

				if(Array.isArray(filterRang)){
					//按筛选条件获取仓库指定数据
					if (filterRang[0] === '>') {
						//获取小于某个值的数据
						cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.lowerBound(filterRang[1],true));
					}else if (filterRang[0] === '<') {
						//用于获取大于某个值的数据
						cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.upperBound(filterRang[1],true));
					}else if (filterRang[0] === '>=') {
						//获取小于或等于某个值的数据
						cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.lowerBound(filterRang[1]));
					}else if (filterRang[0] === '<=') {
						//用于获取大于或等于某个值的数据
						cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.upperBound(filterRang[1]));
					}else {
						//用于获取区间中的数据
						cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.bound(filterRang[0],filterRang[1],filterRang[2],filterRang[3]));
					}
				}else {
					//获取仓库指定数据
					cursor = objectStore.index(filterKey).openCursor(IDBKeyRange.only(filterRang));
				}
			}else {
				//获取仓库所有数据
				cursor = objectStore.openCursor();
			}

			return new Promise((resolve, reject)=> {
				const data=[];
				
				//获取数据成功
				cursor.onsuccess = e=> {
					const res = e.target.result;

					if(res) {
						data.push(res.value);
						res.continue();
					}else {
						//游标循环完毕后改变状态带出数据
						resolve(data);
					}
				};

				//获取数据失败
				cursor.onerror = e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return getFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return getFn(db);
		});
	}
	
	getIndex(storeName,dbName=this.db.curDb){
		const getFn = db=> {
			return db.transaction([storeName], "readonly").objectStore(storeName).indexNames;
		};
		
		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return getFn(this.db[dbName]);
		}
		
		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return getFn(db);
		});
	}
	
	/**
	 * 更新对象数据
	 * @param storeName
	 * @param key
	 * @param newData
	 * @param dbName
	 * @returns {Promise<U>|Thenable<U>|Promise.<TResult>}
	 */
	update(storeName, key,newData, dbName=this.db.curDb) {
		const updateFn = db=> {
			return new Promise((resolve, reject)=> {
				const objectStore = db.transaction([storeName], "readwrite").objectStore(storeName);
				const request=objectStore.get(key);

				request.onsuccess = e=> {
					if (request.result) {
						const keyPath=objectStore.keyPath;
						let putObjextStore;

						if (keyPath) {
							putObjextStore=objectStore.put(Object.assign(newData,{[keyPath]:key}));
						}else {
							putObjextStore=objectStore.put(newData,key);
						}

						//更新数据成功
						putObjextStore.onsuccess = e=> {
							resolve({ code: 100, msg: '数据更新成功!', name: 'UpdateSuccess' });
						};

						//更新数据失败
						putObjextStore.onerror = e=> {
							const error = e.target.error;
							reject({ code: error.code, msg: error.message, name: error.name });
						};
					} else {
						reject({ code: 0, msg: '更新失败,找不到对应数据!', name: 'UpdateError' });
					}
				};
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return updateFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return updateFn(db);
		});
	}

	/**
	 * 删除文档对象数据
	 * @param dbName
	 * @param storeName
	 * @param key
	 * @returns {Promise.<TResult>}
	 */
	del(storeName, key,dbName=this.db.curDb) {
		const delFn = db=> {
			return new Promise((resolve, reject)=> {
				const objectStore=db.transaction([storeName], "readwrite").objectStore(storeName);
				const request=objectStore.get(key);

				request.onsuccess = e=> {
					if (request.result) {
						const delObjectStrore=objectStore.delete(key);

						//删除数据成功
						delObjectStrore.onsuccess = e=> {
							resolve({ code: 100, msg: '删除数据成功!', name: 'DelObjectSuccess' });
						};

						//删除数据失败
						delObjectStrore.onerror = e=> {
							const error = e.target.error;
							reject({ code: error.code, msg: error.message, name: error.name });
						};
					} else {
						reject({ code: 0, msg: '删除数据失败,找不到对应数据!', name: 'UpdateError' });
					}
				};
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return delFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return delFn(db);
		});
	}

	/**
	 * 清空对象仓库数据
	 * @param dbName
	 * @param storeName
	 * @returns {Promise.<TResult>}
	 */
	clear(storeName,dbName=this.db.curDb) {
		const clearFn = db=> {
			return new Promise((resolve, reject)=> {
				const clearObjectStore=db.transaction([storeName], "readwrite").objectStore(storeName).clear();

				//清空成功
				clearObjectStore.onsuccess = e=> {
					resolve({ code: 100, msg: '仓库数据清空成功!', name: 'ClearDatabaseSuccess' });
				};

				//清空失败
				clearObjectStore.onerror = e=> {
					const error = e.target.error;
					reject({ code: error.code, msg: error.message, name: error.name });
				};
			});
		};

		//数据库未关闭时直接使用打开的数库据库操作
		if (this.db[dbName] && this.db[dbName].isOpen) {
			return clearFn(this.db[dbName]);
		}

		//数据库关闭时重新打开再操作
		return this.open(dbName).then(db=> {
			return clearFn(db);
		});
	}
	
	/**
	 * 删除数据库
	 * @param dbName
	 */
	delDB(dbName=this.db.curDb) {
		this.indexDB.deleteDatabase(dbName);
		delete this.db[dbName];
		console.log({ code: 100, msg: `删除数据库${dbName}成功!`, name: 'DelDatabaseSuccess' });
	}

	/**
	 * 关闭对应数据库
	 * @param dbName
	 */
	close(dbName=this.db.curDb) {
		this.db[dbName].close();
		this.db[dbName].isOpen = false;
	}
}
