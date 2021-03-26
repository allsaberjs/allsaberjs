/**
 * 截流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
 * @param {*} fn
 * @param {*} timegap 单位时间
 * @returns function
 */
export const throttle = (fn, timegap) => {
  let nowTime = +new Date()
  return function () {
    const nextTime = +new Date()
    console.log(1, nextTime - nowTime)
    if (nextTime - nowTime >= timegap) {
      fn()
      nowTime = +new Date()
    }
  }
}

