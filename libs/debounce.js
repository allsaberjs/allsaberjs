/**
 * 防抖函数：事件在触发后n秒后再执行，如果在这n秒内事件又被重新触发，则重新计时
 * @param {*} fun 
 * @param {*} wait 
 * @returns function
 */
export function dobounce (fun, wait) {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, wait)
  }
}

