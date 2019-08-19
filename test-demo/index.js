// 引用本地库文件
// const local = require('./utils/allsaber.js')
// console.warn('local:', local)

// es6模式引用
// import { test } from './utils/allsaber'
// console.warn('test:', test, test())

// AMD模式引用
// require(['./utils/allsaber.js'], function(module){
//   console.log('module:', module)
//   console.log('res:', module.test())
// })

// 引用npm包
const un = require('allsaber')
console.warn('npm输出：', un)
