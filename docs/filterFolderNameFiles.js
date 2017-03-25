/**
 * 筛选出与对应文件夹同名的文件
 */
module.exports =function(file,enc,cb){
	const pathStr=file.relative;
	const fileSplit=pathStr.indexOf('\\');
	const fileDot=pathStr.indexOf('.');
	const pathName=pathStr.slice(0,fileSplit);
	const fileName=pathStr.slice(fileSplit+1,fileDot);
	
	console.log(file.path);
	console.log(file.relative);
	
	if(pathName===fileName){
		this.push(file);
	}
	
	cb();
};