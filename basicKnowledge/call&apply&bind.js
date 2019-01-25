/**
 * 手动实现call、apply、bind的方法
 */

 Function.prototype.myCall = function (ctx) {
   if (typeof this !== 'function') {
    throw new TypeError('Error')
   }

   ctx = ctx || window
   ctx.fn = this
   const arg = [...arguments].slice(1)
   const result = ctx.fn(...arg)

   delete ctx.fn // 删除 fn 这个自定义属性
   return result
 }

 /**
  * ctx为可选参数 若没有 则是指向window
  * 给ctx创建一个fn属性 设置为调用的函数
  * 将call的多个参数剥离出
  * 然后调用函数并将fn这个属性删除
  */

// 实现apply
Function.prototype.myApply = function (ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  ctx = ctx || window
  ctx.fn = this
  
  let result
  if (arguments[1]) {
    result = ctx.fn(...arguments[1])
  } else {
    result = ctx.fn()
  }

  delete ctx.fn
  return result
}

// call参数 (this, p1, p2, ....)
// apply参数　(this, [params])

/**
 * 实现bind
 */

 Function.prototype.myBind = function (ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const _this = this
  const args = [...arguments].slice(1)

  // 返回一个函数
  return function F () {
    // 因为返回一个函数 可以new F() 所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(ctx, args.concat(...arguments))
  }
 }