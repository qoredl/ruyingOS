/*
 * @扩展dom类：为HTMLCollection　NodeList等类数组类布署iterator接口.
 * @author：如影(ruying)
 * @e-mail:qoredl@163.com
 * @site:www.ok111.net
 * @date:2016-6-6
 * update:2016-8-28
 */
import arr from './arr';

HTMLCollection.prototype[Symbol.iterator]||(HTMLCollection.prototype[Symbol.iterator]=arr[Symbol.iterator]);
NodeList.prototype[Symbol.iterator]||(NodeList.prototype[Symbol.iterator]=arr[Symbol.iterator]);

HTMLCollection.prototype.entries||(HTMLCollection.prototype.entries=arr.entries);
NodeList.prototype.entries||(NodeList.prototype.entries=arr.entries);

HTMLElement.prototype.matches=HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;