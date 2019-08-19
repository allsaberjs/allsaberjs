# allsaber

JavaScript's functional library

## Installation

Using npm:

```js
npm i allsaberjs --save
```

## Usage

In Node.js:

```js
// Load the full functions
var _ = require('allsaberjs');

// es6 module
import { test } from 'allsaberjs'
console.warn('test:', test, test())  // 调用成功

// AMD引用
require(['allsaber'], function(module){
  console.log('res:', module.test())  // 调用成功
})
```

