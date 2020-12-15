module.exports = function (fun, args, wait) {
  console.log('debounc...')
  let timeout
  return function () {
    console.log('debounc callback...')
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun.apply(args, [true])
    }, wait)
  }
}
