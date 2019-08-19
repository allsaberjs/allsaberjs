// allsaber
(function () {
  var root = self;

  // 定义方法宿主变量
  var _ = function () {
    // code
  }

  if (typeof exports != 'undefined' && !exports.nodeType) {
    console.log(1)
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      console.log(1.1)
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    console.log(2)
    root._ = _;
  }

  /**
   * str_objnum  计算字符串、对象成员数通用函数
  */
  _.str_objnum = function (elem) {
    var num; // 个数
    var typ = typeof elem;
    if (typ === "string") {
      num = elem.length;
      return num;
    } else if (typ === "object") {
      num = 0;
      for (var i in elem) {
        num++;
      }
      return num;
    }
    return false;
  };
  /**
   * @param {url} url
   * @param {*} 参数键名
   * @param {*} 参数键值
   * eg:url = addURLParam(url, "name", "Nicholas");
   */
  _.addURLParam = function (url, name, value) {
    url += (url.indexOf("?") == -1 ? "?": "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
  };
  /**
   * GetQueryString   截取字符串
   */
  _.GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };
  /**
   * 浏览器通知窗口api调用
   */
  _.notification = function() {
    document.getElementById('notifyButton').onclick = function() {
      if (window.Notification) {
        Notification.requestPermission();
      } else alert('你的浏览器不支持此特性，请下载谷歌浏览器试用该功能');
    };
    //
    function windowsNotifyFFAndGE(strNewsContent) {
      var notification = new Notification('此处是通知的标题', {
        body: strNewsContent,
        icon: "" //配置ico
      });
      //设置定时撤销机制，防止通知长时间显示不被关闭
      notification.ondisplay = function(event) {
        setTimeout(function() {
          event.currentTarget.cancel();
        },
        10000);
      };
      //下面是定义点击事件，类似地还可定义其它事件
      notification.onclick = function() {
        window.focus();
        this.cancel();
      };
    }
  };
  /**
   * 
   * 该方法不用转码也不会产生乱码
   * 
   */
  _.getRequest = function() {
    var url = window.location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        //就是这句的问题
        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        //之前用了unescape()
        //才会出现乱码  
      }
    }
    return theRequest;
  };
  /**
   *
   * 原生js事件对象相关
   * 
   */
  _.EventUtil = {
    addHandler: function(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },
    getTarget: function(event) {
      // firefox 下的 event.target = IE 下的 event.srcElement 
      return event.target || event.srcElement;
    },
    removeHandler: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    }
  };

  /**
   * cookie操作封装
   * @method get 获取某个cookie值
   * @method set 设置cookie
   */
  _.CookieUtil = {
    get: function(name) {
      var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
      if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd === -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    },
    /**
     * 必选：name：cookie健值， value：cookie值
     * 可选：expires：设置到期时间， path：cookie的可选的url路径， domain：cookie可选的域， secure：可选的表示是否要添加secure标志的布尔值
     * eg:CookieUtil.set('name', 'tom');
     *    CookieUtil.set('name', 'tom', '/books/project/', 'www.wrox.com', new Date('January 1, 2010'));
     *    CookieUtil.set("name", "Nicholas", null, null, null, true);
     *    CookieUtil.unset("name", "/books/projs/", "www.wrox.com");
     *
     */
    set: function(name, value, expires, path, domain, secure) {
      var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      if (expires instanceof Date) {
        cookieText += '; expires=' + expires.toGMTString();
      }
      if (path) {
        cookieText += '; path=' + path;
      }
      if (domain) {
        cookieText += '; domain=' + domain;
      }
      if (secure) {
        cookieText += '; secure';
      }
      document.cookie = cookieText;
    },
    unset: function(name, path, domain, secure) {
      this.set(name, '', new Date(0), path, domain, secure);
    }
  };

  /**
   * 
   * 子cookie操作方法
   * 
   */
  _.SubCookieUtil = {
    get: function(name, subName) {
      var subCookies = this.getAll(name);
      if (subCookies) {
        return subCookies[subName];
      } else {
        return null;
      }
    },
    getAll: function(name) {
      var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null,
        cookieEnd,
        subCookies,
        i,
        parts,
        result = {};
      if (cookieStart > -1) {
        cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
        if (cookieValue.length > 0) {
          subCookies = cookieValue.split("&");
          for (i = 0, len = subCookies.length; i < len; i++) {
            parts = subCookies[i].split("=");
            result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
          }
          return result;
        }
      }
      return null;
    }
  };
  /**
   * 原生ajax
   */
  _.smallpang_ajax = {
    createXHR: function() {
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
    },
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
    ajax: function(method, url, asy) {
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
  };
  /**
   * 
   * 具有promise机制的ajax
   * 
   */
  _.getJsonPromise = {
    getJSON: function(url) {
      const promise = new Promise(function(resolve, reject) {
        const handler = function() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handler;
        xhr.open("GET", url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.timeout = 1000;
        xhr.ontimeout = function() {
          // code
        }
        xhr.send();
      });
      return promise;
    }
  };
  /**
   * 
   * 展示消息
   * @param msg 消息
   */
  _.showMsg = function(msg) {
    var dom = document.createElement('div');
    dom.innerHTML = msg;
    return dom;
  };
  /**
   * 将NodeList或arguments转化为普通数组的通用方法（兼容所有浏览器）
   */
  _.convertToArray = function(arr) {
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
  /**
   * 防抖debounce
   */
  _.debounce = function (fun, args, wait) {
    console.log('debounc...')
    let timeout
    return function () {
      console.log('debounc callback...')
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        fun.apply(args, [true])
      }, wait)
    }
  };
  _.test = function () {
    return '调用成功'
  };
  // export
  return _;
})();

