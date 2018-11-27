'use strict'
/**
 * 
 * @param {Number} n 
 * 普通递归  可以实现输出某处索引的斐波那契值 
 *  缺点 n 值过大时会发生栈溢出，原因是调用帧过多
 */
function fibonacci(n) {
  if(n < 2) return 1;
  return fibonacci(n-1) + fibonacci(n-2)
}
fibonacci(5)

/**
 * 尾递归优化
 * 递归耗费内存，需要同时保存N多个调用帧，容易发生stackoverflow栈溢出
 * 使用尾递归，只存在一个调用帧，永远不会发生栈溢出的错误
 */
function fibonacciOptimize(n ,x = 1, y = 1) {
  if(n < 2) return y
  return fibonacciOptimize(n - 1 ,y, x + y)
}
fibonacciOptimize(5)

/**
 * 循环累加赋值
 */
function fibonacciLoop(n) {
  if (n < 3) {
    return 1
  }
  let ac1 = 1,ac2 = 1;
  for (let i = 2; i < n; i++) {
    [ac1, ac2] = [ac2 , ac1 + ac2]
    console.log([ac1 , ac2]);
  }
  return ac2
}

fibonacciLoop(10)