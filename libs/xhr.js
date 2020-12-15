function createXHR() {
  if (typeof XMLHttpRequest != 'undefined') {
    // > ie7 
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != 'undefined') {
    // ie7之前的版本
    if (typeof arguments.callee.activeXString != "string") {
      var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
      i,
      len;
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch(ex) {
          //  
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error('NO XHR object available');
  }
}
/**
 * open('请求的类型 method'， '请求的url', '表示是否异步发送请求的布尔值 asy')
 * 
 * xhr.readyState: 
 * 0：未初始化，尚未调用open()方法
 * 1：启动，已经调用open()方法，但尚未调用send()方法
 * 2：发送。已经调用send()方法，但尚未接收到响应。
 * 3：接收。已经接收到部分响应数据
 * 4：完成。已经接收到全局响应数据，而且已经可以在客户端使用了。
 * 
 * xhr.state:
 * http状态码
 * 
 * send(param):
 * 
 * status:
 * 
 */
function ajax(method, url, asy) {
  var handler = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.error(this.status);
        console.log(this.response);
      } else {
        console.log("请求失败: " + new Error(this.statusText));
      }
    }
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handler;
  xhr.open(method, url, asy); // 规定请求的类型、URL 以及是否异步处理请求
  xhr.responseType = 'json'; // 设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。
  xhr.setRequestHeader('MyHeader', 'Myvalue'); // 设置自定义头部
  xhr.timeout = 1000; // 设置超时时间为1秒，仅适用于IE8+
  xhr.ontimeout = function() {
    // code
  }
  xhr.send(params); // 将请求发送到服务器 其中send(string)仅用于post请求
}