//  Array数组的所有方法
// join() 给数组元素加上分隔符转为字符串 省略则默认使用逗号
var arr = [1,2,3];
console.log(arr.join('-')) // 1-2-3

// push() && pop() 
// push()接收任意数量的参数，插入数组尾部，返回修改后数组长度
// pop() 溢出数组最后一项 返回移除项
console.log(arr.push("jack","lili")) // 5
console.log(arr.pop()) // lili

// shift() && unshift()
// shift() 删除数组第一项 返回删除数组值；若数组为空返回undefined
// unshift() 接收任意多参数，插入数组头部，返回数组长度
console.log(arr.shift())  // 1
console.log(arr.unshift('132','哈哈哈')) // 5

// sort() 升序排列数组  最小值在前
// 排序时 会将是每个数组项转成字符串 比较字符串排序
// 可以传入一个比较函数
var arr = [1,45,123,45243,12,45,321]
function compare(a,b){
    return a - b
}
console.log(arr.sort(compare))

// reverse()
// 数组反转
console.log(arr.reverse()) // [ 45243, 321, 123, 45, 45, 12, 1 ]

// concat()
// 将传入参数，添加到原数组后
console.log(arr.concat(1,5,132,[41432,123])) // [ 45243, 321, 123, 45, 45, 12, 1, 1, 5, 132, 41432, 123 ]

// slice() 传入两个参数做起始 结束位置  返回截取的数组(不包括结束位置的元素)
console.log(arr.slice(2,8)) // [ 123, 45, 45, 12, 1 ]

// splice()
// splice() （起始项位置 ， 删除的项数 ， 要插入的元素... ） 返回删除的数组
console.log(arr.splice(0,4,132,456,132456,312)) // [ 45243, 321, 123, 45 ]
console.log(arr) // [ 132, 456, 132456, 312, 45, 12, 1 ]

// 数组内值求和 内值为数字类型
// for循环
function sum1(arr) {
    var num = 0;
    for(var i=0;i<arr.length;i++){
        num += arr[i];
    }
    return num;
}
// forEach
function sum2(arr) {
    var num = 0;
    arr.forEach(function (v,i) {
        num += v
    },0)
    return num
}
// 使用 reduce 函数式编程
function sum3(arr) {  
    return arr.reduce(function (prev,curent,index,arr) {
        return prev+current
    })
}
// 使用eval
function sum4(arr) {
    return eval(arr.join("+"))
}

// 如果数组中存在值item返回元素位置，否则返回-1
// for循环
function indexOf(arr,item) {  
    for(var i=0;i<arr.length;i++){
        if (arr[i] == item) return i;
    }
    return -1;
}