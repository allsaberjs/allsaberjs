export function dobounce (fun, wait) {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, wait)
  }
}

