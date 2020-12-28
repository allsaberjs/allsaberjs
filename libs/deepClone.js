
// ps: 如果是对象数组，还是依然会影响到source值，也就是依然是引用。。。。
function deepClone (source, target){
  const obj = target || {};
  for (const key in source) {
    const val = source[key];
    if (typeof val === 'object') {
      obj[key] = (val.constructor === Array) ? [] : {}
      deepClone(val, obj[key])
    } else {
      obj[key] = val;
    }
  }
  return obj
}

module.exports = deepClone
