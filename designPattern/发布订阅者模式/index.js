// 发布-订阅模式 ==> 观察者模式
/**
 * 定义了对象间的一种一对多的关系，让观察者对象同时监听某一个主题对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知
*/

var Event = function () {  
  this.obj = {}
}

Event.prototype.on = function (eventType, fn) {  
  // 判断是否有此类型事件
  if (!this.obj[eventType]) {
    // 没有设为空数组
    this.obj[eventType] = []
  }
  // 有此类事件 插入方法
  this.obj[eventType].push(fn)
}
Event.prototype.emit = function () {  
  var eventType = Array.prototype.shift.call(arguments)
  var arr = this.obj[eventType]
  for (let i = 0; i < arr.length; i++) {
    arr[i].apply(arr[i],arguments)    
  }
}

var ev = new Event()

ev.on('click',function (a) {   // 订阅函数
  console.log(a);
})

ev.emit('click',1)  // 发布函数

// 使用者先执行发布 后订阅
var Event = function () {  
  this.obj = {}
  this.cacheList = []
}

Event.prototype.on = function (eventType,fn) {  //  订阅
  if (!this.obj[eventType]) {
    this.obj[eventType] = []
  }
  this.obj[eventType].push(fn)

  for (let i = 0; i < this.cacheList.length; i++) {
    this.cacheList[i]()
    console.log('cacheList------',this.cacheList);
  }
}

Event.prototype.emit = function () {    // 发布
  const arg = arguments // 获取参数数组
  const that = this
  function cache() {  
    var eventType = Array.prototype.shift.call(arg) // 获取第一个参数
    var arr = that.obj[eventType]   // 获取订阅事件数组
    for (let i = 0; i < arr.length; i++) {
      arr[i].apply(arr[i],arg)    // 
      console.log('arr------',arr);
      console.log('arr[i].apply--------',arr[i].apply(arr[i],arg));
    }
  }
  this.cacheList.push(cache)
}

// 实现如下逻辑
var ev = new Event()
ev.emit('click',1)

ev.on('click',function (a) {  
  console.log(a);
})