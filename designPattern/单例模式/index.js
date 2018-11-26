const singleton = function (name) {  
  this.name = name
  this.instance = null
}

singleton.prototype.getName = function () {  
  console.log(this.name);
}

singleton.getInstance = function (name) {  
  if (!this.instance) { // 关键语句
    this.instance = new singleton(name)
  }
  return this.instance
}

// test
const a = singleton.getInstance('aaa')
const b = singleton.getInstance('bbb')

console.log(a === b);
console.log(singleton);

/**
 * javascript为无类语言，而且js中全局对象符合单例模式两个条件
 * 很多时候我们将全局对象当成单例模式使用
 */
var obj = {}

/**
 * 单例模式的弹框层
 * 实现弹框一种做法为先创建弹框 使之隐藏 会浪费部分不必要的DOM开销
 * 可以在需要弹框时再创建，结合单例模式实现只有一个实例，节省部分dom开销
*/
const createLoginLayer = function () {  
  const div = document.createElement('div');
  div.innerHTML = '登陆弹窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div
}
//  使单例模式和创建弹框代码解耦
const getSingle = function (fn) {  
  const result
  return function () {  
    return result = fn.apply(this, arguments) || result;
  }
}

const createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {  
  createSingleLoginLayer();
}

 