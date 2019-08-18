// 此处暂且参考unserscorejs模块测试
const local = require('./utils/underscore.js')
console.warn('local:', local)

// 按需引用测试
import {test} from './utils/underscore'
console.warn('test:', test)

const un = require('underscore')
console.warn('npm输出：', un)

// const json = require('./test.json')
// console.warn('json:', json)