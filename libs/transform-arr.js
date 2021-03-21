/**
 * 将NodeList或arguments转化为普通数组的通用方法（兼容所有浏览器）
 */
export function transformArr(arr) {
  var array;
  try {
    array = Array.prototype.slice.call(arr, 0);
  } catch(err) {
    arr = [];
    for (var i = 0; i < arr.length; i++) {
      array.push(arr[i]);
    }
  }
  return array;
};