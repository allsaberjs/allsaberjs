/**
 * 
 * todo1: 循环引用处理，如 obj.haha = obj
 * - 如果对象中循环引用，调用如下方法会报错：Maximum call stack size exceeded
 * - JSON.parse(JSON.stringify(a));也无法拷贝，会报错 TypeError: Converting circular structure to JSON
 * 
 * todo2: 数组的判断
 * 
 * todo3 typeof null 'object'，没有区分null的问题
 * 
 * todo4:拷贝symbol
 * 
 */
import isArray from './isArray'
import isObject from './isObject'

export function deepClone (source, hash){
  const hashArr = hash || new WeakMap()
  if(hashArr.has(source)) return hashArr.get(source)

  const target = isArray(source) ? [] : {};
  hashArr.set(source, target)

  for (const key in source) {
    const val = source[key]
    if (isObject(val)) {
      target[key] = deepClone(val, hashArr)
    } else {
      target[key] = val
    }
  }
  return target
}




