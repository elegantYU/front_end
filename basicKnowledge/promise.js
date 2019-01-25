/**
 * promise 语法的学习
 */

//  promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用两个参数 resolve和reject
var promise = new Promise(function (resolve, reject) {
  /**
   * 操作成功 调用resolve并传入 value
   * 操作失败 调用reject并传入 value
   */
})

// promise主体
function Promise(executor) {
  var self = this
  self.status = 'pending' // 当前状态
  self.data = undefined // promise值
  self.onResolvedCallback = [] //promise resolve时的回调函数集， 在promise结束时可能会有多个回调函数添加
  self.onRejectedCallback = [] // 同上 rejected时可能会有多个回调函数添加

  executor(resolve, reject) // 执行executor并传入相应参数
}

// 定义resolve reject 参数
function Promise(executor) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    //  TODO
    //  更改status 调用回调数组中的方法
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }

    setTimeout(function(){
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    // TODO
    // 同上
    setTimeout(function(){
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)        
        }
      }
    })
  }

  try { //考虑到执行executor过程中可能出错，用try/catch块包装，并在出错时 使用catch的error reject掉promise
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}


/**
 *  then方法
 * 
 *  在promise/A标准中，规定then要返回一个新的对象
 */

//  then方法接收两个参数 onResolved,onRejected 
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则需要忽略
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {}

  // promise三种状态使用三个if块处理
  if (self.status === 'resolved') {
    return promise2 = new Promise(function (resolve, reject) {
      //  考虑到有可能会throw 将其包在try catch中
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象 直接取它的结果作为promise
          x.then(resolve, reject)
        }
        resolve(x) // 否则使用它的返回值作为promise2的结果
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
    // 如果当前promise还处于pending状态 无法确定调用onResolved 还是 onRejected
    // 需等promise状态确定后 才能继续处理
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (v) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function (r) {  
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

// 实现catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

/**
 * 若是 new Promise(resolve, reject)
 *          .then()
 *          .then()
 *          .then()
 *          .then(function foo(value) {
 *              alert(value)
 *          })
 * 则会抛出 undefined, 这种行为称为穿透
 */

// 避免穿透
onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { return reason }
// 加上返回值 继续向后抛

// 如何测试Promise是否符合标准，只需在模块中暴露出一个deferred的方法

Promise.deferred = Promise.defer = function () {  
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

//  如何终止一个Promise

Promise.cancel = Promise.stop = function () {  
  return new Promise(function () {})
}

// 使用cancle

new Promise(function (resolve, reject) {
  resolve(24)
})
  .then(function (value) {
    return Promise.cancel()
  })
  .catch()
  .then()
  .then()
  .catch()




// use es6
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class newPromise {
  constructor (fn) {
    // 当前状态
    this.state = PENDING
    // 终值
    this.value = null
    // 拒因
    this.reason = null
    // 成功回调队列
    this.onFulfilledCB = []
    // 失败回调队列
    this.onRejectedCB = []

    // 成功态回调
    const resolve = value => {
      // 使用macro-task机制(settimeout)，确保onFulfilled异步执行
      // 且在then方法被调用的那一轮事件循环之后的新执行栈中执行
      setTimeout(() => {
        if (this.state === PENDING) {
          // 更改状态
          this.state = FULFILLED
          // 终值
          this.value = value
          this.onFulfilledCB.map(cb => {
            this.value = cb(this.value)
          })
        }
      })
    }
    // 拒绝态回调
    const reject = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED
          this.reason = value
          this.onRejectedCB.map(cb => {
            this.reason = cb(this.value)
          })
        }
      })
    }
    // 执行promise
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // then方法
  then (onFulfilled, onRejected) {
    // 判断类型 加入相应队列
    typeof onFulfilled === 'function' && this.onFulfilledCB.push(onFulfilled)
    typeof onRejected === 'function' && this.onRejectedCB.push(onRejected)
    // 返回this支持then方法 可以被同一个promise调用多次
    return this
  }
}

new xPromise((resolve, reject) => {
  resolve(3)
}).then(res => {
  console.log(res)
})