import iterator from './iterator';

//添加iterator接口
//兼容旧版手机浏览器，这些浏览器数组上无es6的[Symbol.iterator]，entries等扩展方法
Array.prototype.entries||Object.assign(Array.prototype,iterator);

export default [];