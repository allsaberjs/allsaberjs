export function setCookie(name, value, expires, path, domain, secure) {
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
}