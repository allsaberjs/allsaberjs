/**
 * 截流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
 * @param {*} fn
 * @param {*} gapTime 单位时间
 * @returns undefined
 */
export function throttle(fn, gapTime) {
  let _lastTime = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}

