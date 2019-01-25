// 模拟答题
// 前端缓存方式
/**
 * cookie   用于前后端通信，在http请求的时候会携带 5k大小 消耗资源
 * localstorage   本地存储  关闭浏览器也会存在
 * sessionstorage 会话存储  关闭页面会结束会话
 * seviceworker   可指定缓存文件  先install 再请求资源缓存
 * indexDB    据说是前端的数据库 操作都是建表操作等 不熟悉
 */

//  跨域处理方式
/**同源策略是为了限制CSRF攻击(一种利用用户登录状态发起恶意请求的攻击)
 * 
 * jsonp  生成一个script标签，利用script没有跨域限制的特性请求资源，在请求地址后加上回调函数。缺点是只能使用get方法。
 * cors   后端设置请求头进行跨域
 * nginx  在nginx上反向代理页面路径或接口路径
 * postMessage  页面内嵌套的页面之间的跨域处理
 * domain  同一域名不同二级域名之间的跨域
 */

//  网络缓存
/**
 * service worker  指定缓存文件，如何匹配缓存，如何读取缓存。若没有命中，会根据缓存的优先级查找数据
 * memory cache 内存中的缓存，读取速度比磁盘读取快，会随着进程的释放而释放。
 * disk cache 缓存到磁盘中，会根据http的头部信息判断是否需要缓存。
 * 网络请求 所有缓存都没有命中，只能请求网络获取资源
 * 网络请求的缓存策略 
 * 强缓存  expires或者cache-control 设置缓存到期时间
 * 协商缓存   last-modified 上次更新时间和ETag。缓存过期会先请求资源判断是否有改动，没过期返回304。
 */

//  浏览器渲染过程
/**
 * html  将字节文件转化为字符串，字符串转标记，标记转node节点，节点构建dom树
 * css  同上 转为 cssom树
 * 两者合并，生成一个渲染树，合层图层，若节点是display:none 则不会在渲染树中出现
 */

//  html5 和 css3的新特性
/**
 * html 
 *  标签语义化
 *  存储
 *  video audio
 *  input类型多样化
 *  canvas / svg
 *  websocket
 * 
 * css
 *  过渡 transition
 *  变形 transform
 *  动画 animation @keyframe
 *  渐变
 *  阴影 shadow
 *  圆角 border-radius
 *  弹性布局
 *  选择器 :nth-of-type
 *  盒模型
 */

//  js相关知识
/**
 * 有几种数据类型
 */
/**
 * 原始数据类型和引用类型
 * string        object
 * number        function
 * boolean        array
 * null                       
 * undefined
 * symbol
 */

// typeof 和 instanceof的区别
/**
 * typeof只能判断原始类型的数据
 * instanceof可以判断对象类型的，是根据判断对象的原型判断的__proto__
 */

// promise原理及手写
/**
 * promise是es6里用来处理回调事件的最佳方法。
 * 内部有三种状态 pending fulfilled rejected 初始状态是pending，一旦切换为其他某一状态，将保持不会切换为其他状态
 * 可传两个参数 resolve,reject 用来处理成功和报错的回调函数
 * 
 */
const PENDING = 'pending'
const FULFILLL = 'fulfilled'
const REJECTED = 'rejected'

class xPromise {
  constructor (fn) {
    this.state = PENDING
    this.value = null
    this.reason = null
    this.resolvedCallBack = []
    this.rejectedCallBack = []

    const resolve = value => {
      setTimeout(() => {
        // 判断状态
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
          this.resolvedCallBack.map(cb => {
            this.value = cb(this.value)
          })
        }
      })
    }

    const reject = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED
          this.value = value
          this.rejectedCallBack.map(cb => {
            this.value = cb(this.value)
          })
        }
      })
    }

    try {
      fn(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then (res, rej) {
    typeof res === 'function' && this.resolvedCallBack.push(res)
    typeof rej === 'function' && this.rejectedCallBack.push(rej)
    // return this 是支持一个promise被then多次调用
    return this
  }
}
// 传入一个方法 方法内有两个参数 resolve reject
new xPromise((resolve, reject) => {
  resolve(3)
}).then(res => {
  setTimeout(() => {
    console.log(res)
  },200)
})


// 实现一个继承
function Super () {
  Super.prototype.getNumber = function () {
    return 1
  }
}

function Sub () {
  let s = new Sub()
  Sub.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Sub,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
}
/**
 * 将子类原型设置为父类原型
 * 使用es6
 */

class Parent {
  constructor (value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}

class Child extends Parent {
  constructor (value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)


/**
 * BFC  block formatting context
 * 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-block table-cells table-captions）,
 * 以及overflow值不为visiable的块级盒子， 都会为他们创建新的BFC
 * 
 * 具体要求如下
 * 1. float的值不是none
 * 2. position的值不是static或者relative
 * 3. display的值是inline-block table-cell table-caption flex 或者 inline-flex
 * 4. overflow的值不是visiable
 * 满足任意一要求，都是一个BFC
 * BFC是一个独立的布局环境，其中元素布局是不受外界影响
 */


/**
 * VUE 的双向绑定
 */
//  通过Object.defineProperty()实现数据劫持，控制一个对象属性的一些特有操作(get\set)

// 打印一个普通的对象属性
var book = {
  name: '好好学习'
}
console.log(book.name)
//  若在打印属性值的时候加上书名号，可以通过Object.defineProperty()
var book = {}
var name = ''
Object.defineProperty(book, 'name', {
  set: function (value) {
    name = value
    console.log(`这本书的名字叫${value}`)
  },
  get: function () {
    return `《${name}》`
  }
})
book.name = 'Vue的数据劫持'
console.log(book.name)

//  简易的双向绑定  订阅通知模式
/**
 *  1. 设置一个监听器Observer，用来监听(劫持)所有属性，若有改动则通知订阅者
 *  2. 实现一个订阅者Watcher，可以收到属性变化通知并执行相应函数，更新view
 *  3. 实现一个解析器Compile, 可以扫描和解析每个节点的相关指令，并根据数据初始化模版数据以及初始化相应的订阅器
 */

//  实现一个 Observer 

function defineReact (data, key, val) {
  observe(data) // 遍历所有子属性

  var dep = new dep()

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if ('判断是否需要添加订阅者') dep.addSub(watcher) //  添加订阅者
      return val
    },
    set: function (newValue) {
      if (val === newValue) return
      val = newValue
      console.log(`属性${key}，已被监听，现在为:${val.toString()}`)

      dep.notify()  //通知所有订阅者
    }
  })
}

function observe (data) {
  if (!data || typeof data !== 'object') return
  
  Object.keys(data).forEach(v => {
    defineReact(data, v, data[v])
  })
}

// 加入dep消息订阅器可容纳订阅者
function dep () {
  this.subs = []
}
dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(v => {
      v.update()
    })
  }
}


const library = {
  book: {
    name: '书名号'
  },
  book: '不知道'
}

observe(library)
