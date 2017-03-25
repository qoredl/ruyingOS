import body from './body';

/**
 * 检测transition,animation动画能力函数
 * @param evenNames
 * @returns {{end}}
 */
function supportCheck(evenNames) {
	for (let name in evenNames) {
		if (evenNames.hasOwnProperty(name)&&body.style[name] !== undefined) {
			return evenNames[name];
		}
	}
}

const transitionend = supportCheck({
	WebkitTransition: 'webkitTransitionEnd',
	MozTransition: 'transitionend',
	OTransition: 'oTransitionEnd otransitionend',
	transition: 'transitionend'
});

const animationend = supportCheck({
	WebkitAnimation: 'webkitAnimationEnd',
	MozAnimation: 'animationend',
	OAnimation: 'oAnimationEnd oanimationend',
	animation: 'animationend'
});

/**
 * 返回动画requestAnimationFrame函数
 *handle multiple browsers for requestAnimationFrame()
 *http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 *https://github.com/gnarf/jquery-requestAnimationFrame
 */
window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame;

window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame;

// https://developer.mozilla.org/zh-CN/docs/DOM/MutationObserver
window.MutationObserver = window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;


const touch = (
('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
(window.DocumentTouch && document instanceof window.DocumentTouch) ||
(window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
(window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
false);

export default{
	transitionend,
	animationend,
	requestAnimationFrame,
	cancelAnimationFrame,
	MutationObserver,
	touch
};