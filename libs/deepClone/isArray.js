export default function isArray (val){
  return Object.prototype.toString.call(val) === '[object Array]'
}