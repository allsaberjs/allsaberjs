// 引用npm包
const npm_ = require('allsaberjs')
console.warn('npm输出：', npm_, npm_.test())

// es6模式引用
// import { test } from './utils/allsaber'
// console.warn('test:', test, test())

// AMD模式引用
// require(['./utils/allsaber.js'], function(module){
//   console.log('module:', module)
//   console.log('res:', module.test())
// })

