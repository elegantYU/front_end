/**
 * 状态模式： 将事物内部封装成类，内部状态改变会产生不同行为
 * 优点： 用对象代替字符串记录当前状态，状态易维护
 * 缺点： 需编写大量状态
 * 
*/
//  场景测试 
//  电灯按一下打开弱光 两下打开强光 三下关闭灯光

const weakLight = function (light) {  
  this.light = light
}
weakLight.prototype.press = function () {  
  console.log(`打开强光`);
  this.light.setState(this.light.strongLight)
}

const strongLight = function (light) {  
  this.light = light
}
strongLight.prototype.press = function () {  
  console.log(`关灯`);
  this.light.setState(this.light.offLight);
}

const offLight = function (light) {  
  this.light = light
}
offLight.prototype.press = function () {  
  console.log(`打开弱光`);
  this.light.setState(this.light.weakLight);
}

const Light = function () {  
  this.weakLight = new weakLight(this)
  this.strongLight = new strongLight(this)
  this.offLight = new offLight(this)
  this.currentState = this.offLight   // 初始状态
}

Light.prototype.init = function () {  
  const btn = document.createElement('button')
  btn.innerHTML = '按钮'
  document.body.append(btn)
  const self = this
  btn.addEventListener('click',function () {  
    self.currentState.press()
    /**
     * self.currentState.press() ==> offLight.press()
    */
  })
}

Light.prototype.setState = function (state) {  
  this.currentState = state
}

const light = new Light()
light.init()


/**
 * javascript中的委托机制，可以实现如下状态模式
*/
const obj = {
  'weakLight': {
    press: function () {  
      console.log(`打开强光`);
      this.currentState = obj.strongLight
    }
  },
  'strongLight': {
    press: function () {  
      console.log(`关闭`);
      this.currentState = obj.offLight
    }
  },
  'offLight': {
    press: function () {  
      console.log(`打开弱光`);
      this.currentState = obj.weakLight
    }
  },
}

const Light = function () {  
  this.currentState = obj.offLight
}

Light.prototype.init = function () {  
  const btn = document.createElement('button')
  btn.innerHTML = '按钮'
  document.body.append(btn)
  const self = this
  btn.addEventListener('click',function () {  
    self.currentState.press.call(self)      // 通过call完成委托
  })
}

const light = new Light()
light.init()

/**
 * 1.状态模式定义了状态与行为的关系，并将其封装在一个类中。通过新增状态类，增加状态转换
 * 2.避免Context 无限膨胀，状态切换的逻辑被分布在状态类中，去掉了Context中原本过多的条件分支
 * 3.Context中的请求动作和状态类中封装的行为可以非常容易的独立变化而互不影响
*/

/**
 * 策略模式和状态模式的区别
 * 策略模式中 各个策略类之间是平等又平行的，之间没有任何联系，必须熟知策略类的作用，以便随时主动切换算法
 * 状态模式中 状态和状态对应的行为是早被封装好，使用时不需要了解细节，“改变行为”发生在状态模式内部
*/