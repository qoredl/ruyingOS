/**
 * @触屏事件扩展
 * @date:2016-9-12
 * update:2016-9-12
 */
import body from '../var/body';
import factory from './r.factory';

for (let eventType of [
	'swipeLeft',
	'swipeRight',
	'swipeUp',
	'swipeDown',
	'swipeEnd',
	'drag',
	'dragH',
	'dragV',
	'dragEnd',
	'longTap'
]) {
	factory.fn[eventType] = function (callback) {
		for (let eventTarget of this) {
			const $target = factory(eventTarget);
			const posStart = {};//开始滑动坐标
			const posEnd = {};//滑动结束坐标
			let touch;//触屏对象

			//拖动:拖动对象相对位置坐标
			let tagrgetTranslate;

			//长按:事件相关变题
			let tapDelay;
			let tapTimer;
			let tapTimeStart;
			let tapTimeEnd;

			//设置长按时长
			if (eventType === 'longTap') {
				tapDelay = 750;
			}

			//取消长按事件
			function cancleLongTap() {
				tapTimer && clearTimeout(tapTimer);
				tapTimer = null;
			}

			//绑定原生事件
			eventTarget.addEventListener('touchstart', starTouch, false);
			eventTarget.addEventListener('mousedown', starTouch, false);

			eventTarget.addEventListener('touchend', endTouch, false);
			eventTarget.addEventListener('mouseup', endTouch, false);

			eventTarget.addEventListener('touchcancel', endTouch, false);

			//鼠标滚轮事件
			body.addEventListener('mousewheel',factory.debounce(function (event) {
				wheelEventHander(event);
			},500,true),false);
			body.addEventListener('DOMMouseScroll',factory.debounce(function (event) {
				wheelEventHander(event);
			},500,true),false);

			function starTouch(event) {
				//长按：设置长按定时器
				if (eventType === 'longTap') {
					tapTimeStart = Date.now();
					tapTimer = setTimeout(callback, tapDelay);
				}

				if (event.type === 'mousedown') {
					//pc端
					posStart.x = event.pageX;
					posStart.y = event.pageY;
				}else {
					if (!event.touches.length) return;

					posEnd.x = 0;
					posEnd.y = 0;

					touch = event.touches[0];

					posStart.x = touch.pageX;
					posStart.y = touch.pageY;
				}

				//拖动：获取事件对象相对位置坐标
				if (eventType === 'drag' || eventType === 'dragH' || eventType === 'dragV') {
					tagrgetTranslate = $target.transformCss('translate');
				}

				//绑定touchmove事件
				eventTarget.addEventListener('touchmove', moveTouch, false);
				eventTarget.addEventListener('mousemove', moveTouch, false);
			}

			function moveTouch(event) {
				event.preventDefault();

				//长按：取消长按事件
				cancleLongTap();

				if (event.type === 'mousemove') {
					//pc端
					posEnd.x = event.pageX;
					posEnd.y = event.pageY;
				}else {
					if (!event.touches.length) return;

					touch = event.touches[0];
					posEnd.x = touch.pageX;
					posEnd.y = touch.pageY;
				}
				
				//拖动:开始拖动对象
				const moveDelta = {
					x: posEnd.x - posStart.x,
					y: posEnd.y - posStart.y
				};

				//限制 touchmove 在一个很小范围，给用户一定的冗余空间，
				//防止用户手指在接触屏幕的时候不发生轻微的位移。
				if (Math.abs(moveDelta.x) > 10||Math.abs(moveDelta.y)) {
					if (eventType === 'dragH') {
						if (tagrgetTranslate) {
							$target.transformCss('translate', Number.parseInt(tagrgetTranslate[0], 10) + moveDelta.x + 'px,' + tagrgetTranslate[1]);
						} else {
							$target.transformCss('translate', moveDelta.x + 'px,0px');
						}
					}

					if (eventType === 'dragV') {
						if (tagrgetTranslate) {
							$target.transformCss('translate', tagrgetTranslate[0] + ',' + (Number.parseInt(tagrgetTranslate[1], 10) + moveDelta.y + 'px'));
						} else {
							$target.transformCss('translate', '0px,' + (moveDelta.y + 'px'));
						}
					}

					if (eventType === 'drag') {
						if (tagrgetTranslate) {
							$target.transformCss('translate', Number.parseInt(tagrgetTranslate[0], 10) + moveDelta.x + 'px,' + (Number.parseInt(tagrgetTranslate[1], 10) + moveDelta.y + 'px'));
						} else {
							$target.transformCss('translate', moveDelta.x + 'px,' + moveDelta.y + 'px');
						}
					}
				}
			}

			function endTouch() {
				//长按：判断是否为长按
				if (eventType === 'longTap') {
					tapTimeEnd = Date.now();
					if ((tapTimeEnd - tapTimeStart) < tapDelay) cancleLongTap();
				}

				//滑动方向
				let dir;

				if (Math.abs(posEnd.y - posStart.y) - Math.abs(posEnd.x - posStart.x) > 0) {
					if (posEnd.y && posEnd != posStart.y && posEnd.y - posStart.y <= -25) {
						dir = 'swipeUp';
					} else if (posEnd.y && posEnd != posStart.y && posEnd.y - posStart.y >= -25) {
						dir = 'swipeDown';
					}
				} else {
					if (posEnd.x && posEnd != posStart.x && posEnd.x - posStart.x <= -25) {
						dir = 'swipeLeft';
					} else if (posEnd.x && posEnd != posStart.x && posEnd.x - posStart.x >= -25) {
						dir = 'swipeRight';
					}
				}

				if (dir === eventType) callback();

				//结束滑动,拖动时回调
				if (eventType === 'swipeEnd' || eventType === 'dragEnd') callback(posStart, posEnd, dir);
				
				//解绑touchmove事件
				eventTarget.removeEventListener('touchmove', moveTouch, false);
				eventTarget.removeEventListener('mousemove', moveTouch, false);
			}

			function wheelEventHander(event) {
				event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;

				//滚轮向上滚，对应swipeUp
				if (event.delta > 0 && eventType === 'swipeUp') {
					callback();
				}

				//滚轮向上滚向下swipeDown
				if (eventType === 'swipeDown') {
					callback();
				}
			}
		}

		return this;
	}
}
