/**
 * 浏览器环境工具函数库,
 * 只能运行在浏览器环境
 * @date:2016-5-14
 */
import hasOwn from '../var/hasOwnProperty';
import dom from '../var/dom';
import body from '../var/body';

/**
 * 返回绝对网址，即完整网址
 * @see https://davidwalsh.name/get-absolute-url
 * @param url [String='']
 * @returns {String}
 */
const getAbsoluteUrl = (url = '') => {
  const a = dom.createElement('a');
  a.href = url;
  return a.href;
};


/**
 * 测量滚动条宽度
 * Measure scrollbar width for padding body during modal show/hide
 * https://github.com/react-component/table/blob/master/src/utils.js
 * @returns {*}
 */
let scrollbarWidth;
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};
export function measureScrollbar() {
  if (typeof dom === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  
  if (scrollbarWidth) {
    return scrollbarWidth;
  }
  
  const scrollDiv = dom.createElement('div');
  
  for (const scrollProp in scrollbarMeasure) {
    if (hasOwn.call(scrollbarMeasure, scrollProp)) {
      scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    }
  }
  body.appendChild(scrollDiv);
  scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  body.removeChild(scrollDiv);
  
  return scrollbarWidth;
}
