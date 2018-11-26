// 代理模式
/**
 * 代理对象和本体对象的接口一致 对使用者友好
 * 在js中常见的为 虚拟代理和缓存代理
*/

// 图片预加载 通过代理模式使创建图片与预加载逻辑分离，若未来不需要预加载可直接使用本体代理请求对象
const myImage = (function () {  
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    // 回调中设置图片路径
    setSrc:function (src) {  
      imgNode.src = src
    }
  }
})
// 代理方法
const proxyImage = (function () {  
  const img = new Image()
  img.onload = function () { // http图片加载完成后执行  
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {  
      myImage.setSrc('loading.jpg') // 预加载时的图片
      img.src = src
    }
  }
})
// 调用预加载方法
proxyImage.setSrc('http://loaded.jpg')
// 本体调用
myImage.setSrc('http://someimg.jpg')


/**
 * 缓存代理实现乘积计算
*/
const mult = function () {  // 参数乘积运算
  let a = 1
  for (let i = 0,l; l = arguments[i++];) {
    console.log(l);
    a = a * l
  }
  return a
}

const proxyMult = (function () {
  const cache = {}
  return function () {  
    const tag = Array.prototype.join.call(arguments,',')
    if (cache[tag]) {
      return cache[tag]
    }
    // 使用mult方法
    cache[tag] = mult.apply(this,arguments)
    return cache[tag]
  }
})()

proxyMult(1,2,3,4)

// 代理模式在后期优化使用