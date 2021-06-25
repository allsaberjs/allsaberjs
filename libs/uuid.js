/**
 * 该方法基于国际uuid规范version4.0
 * 
 * 附：
 * 版本1：基于时间的UUID
 * 版本2：DCE安全的UUID
 * 版本3：基于名字空间的UUID（MD5）
 * 版本4：基于随机数的UUID
 * 版本5：基于名字空间的UUID（SHA1）相比v3，散列函数换成了SHA1
 */
 export const generateUuid = (len) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = []
  const base = chars.length;

  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * base]
    }
  } else {
    // rfc4122 第四版本规范
    let r = ''

    // rfc4122 规范格式要求 8-4-4-4-12 "FFC1688A-AC49-4336-A2FA-36FF54A91C8D"，其中字母是16进制表示，大小写无关
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    // xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    // N的位置，只会是8,9,a,b
    // M的位置代表版本号，uuid的标准实现有5个版本，所以只能是1、2、3、4、5，这里采用 版本4
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as per rfc4122, sec. 4.1.5 
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r] // 19即上面的N位
      }
    }
  }
  return uuid.join('');
}
