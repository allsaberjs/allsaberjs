/**
 * todo1: 数组的判断
 * 
 * todo2: 循环引用处理，如 obj.haha = obj
 * - 如果对象中循环引用，调用如下方法会报错：Maximum call stack size exceeded
 * - JSON.parse(JSON.stringify(a));也无法拷贝，会报错 TypeError: Converting circular structure to JSON
 * 
 * todo3 typeof null 'object'，没有区分null的问题
 * 
 */
function deepClone (source, target){
  const obj = target || {};
  // if array
  // todo later...
  // if object
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
