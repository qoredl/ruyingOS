//扩展String类,兼容旧版手机浏览器
const strPro=String.prototype;

String.prototype.startsWith||Object.assign(strPro,{
	startsWith(searchString,position){
		if (position) {
			return this.indexOf(searchString) === position;
		}
		
		return this.indexOf(searchString)===0;
	},
	endsWith(searchString,position){
		if (position) {
			const sStr=this.substring(0,position);
			
			return this.lastIndexOf(sStr)===(sStr.length-position.length);
		}
		
		return this.lastIndexOf(searchString)===this.length-searchString.length;
	}
});