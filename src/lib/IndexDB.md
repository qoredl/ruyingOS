# 一级标题 h1

```
const d = $.indexDB('ruying');

	//删除数据库
	d.delDB('st');

	//打开数据库
	d.open().then(function (db) {
		console.log(db);
	}).catch(function (errMsg) {
		console.log(errMsg);
	});

	//1.创建单个对象创库
	const index=[
	 ['name','name',false],
	 ['age','age',false],
	 ['email','email',true]
	 ];
	 d.updateStroe({storeName:'test',/*keyPath:'userId',*/index:index}).then(function (db) {
	 console.log(db);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//2.创建多个对象创库
	d.updateStroe([
	 {storeName:'test'},
	 {storeName:'user',keyPath:'userId'},
	 {storeName:'news',keyPath:'newsId'}
	 ]).then(function (db) {
	 console.log(db);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//删除单个对象仓库
	d.updateStroe('test').then(function (db) {
	 console.log(db);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//删除多个对象仓库
	d.updateStroe(['user','test','news']).then(function (db) {
	 console.log(db);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//向指定仓库添加单条文档对象数据
	d.add('test',{name: 'qoredl', email:'sssss@163.com',des: 'I am ssss.' }).then(function (msg) {
	 console.log(msg);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//向指定仓库添加多条文档对象数据
	d.add('test',[
	 {name: 'qoredl', email:'qoredl@163.com',age:20,des: 'I am qoredl.' },
	 {name: 'qoredl',  email:'ok111@163.com',age:32,des: 'I am ok111.' },
	 {name: 'ruying', email:'222@163.com', age:20,des: 'I am 222.' },
	 {name: 'other',  email:'st@163.com',age:91,des: 'I am other.' }
	 ]).then(function (msg) {
	 console.log(msg);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//按键获取数据
	d.getBykey('test',3).then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//获取仓库全部数据
	d.get('test').then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//获取属性等于某个值的数据
	d.get('test',{name:'qoredl'}).then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//获取仓库中指定区间数据
	d.get('test',{age:[20,95,true,true]}).then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	d.get('test',{age:['>',32]}).then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//更新文档对象数据
	d.update('test',24,{ name:'222',des: 'sss',st:'st' }).then(function (data) {
	 console.log(data);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//删除文档对象数据
	d.del('test',9).then(function (msg) {
	 console.log(msg);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });

	//清空对象仓库数据
	d.clear('test').then(function (msg) {
	 console.log(msg);
	 }).catch(function (errMsg) {
	 console.log(errMsg);
	 });
```

