/**
 * 命令模式
 * 将请求封装成对象，分离命令接收者和发起者之间的耦合。命令执行之前再执行对象中传入接受者。主要目的为互相之间的解耦
 * 1. 发起者：发出调用命令即可，不清楚如何执行，谁执行
 * 2. 接收者：有对应的接口处理不同的命令，不清楚什么命令，谁发出命令
 * 3. 命令对象：发起者和接受者的桥梁
 */
// 例如事件绑定机制
// 发出命令
const setCommand = function (button,command) {  
  button.onClick = function () {  
    // 关联命令对象
    command.excute()
  }
}
//  执行者
const menu = {
  updateMenu: function () {  
    console.log('更新菜单');
  },
}
//  命令对象
const UpdateCommand = function (receive) {  
  // receive 执行者对象
  return {
    // 发起者和执行者的对接
    excute: receive.updateMenu,
  }
}

const demoUpdate = UpdateCommand(menu); // 创建命令

const button1 = document.getElementById('button1')
setCommand(button1,demoUpdate);


