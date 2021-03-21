/**
 * 截取浏览器url参数
 * @param {*} name 所要获取的 key 名称
 */
export function getQuery(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};