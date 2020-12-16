function dobounce (fun, args, wait) {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun.apply(args, [true])
    }, wait)
  }
}

module.exports = dobounce
