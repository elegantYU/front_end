//  迭代器模式  能访问到聚合对象的顺序与元素

// 简易迭代器
function each(arr,fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr[i])
  }
}

each([4,5,6],function (i,n) {  
  console.log(i);
  console.log(n);
})

// -------------------
// 内部迭代器调用简单，使用者不用关心迭代器内部实现细节（缺点）
// 比较数组是否相等，只能在其回调函数中作文章

const compare = function (arr1,arr2) {  
  each(arr1,function (i,n) {  
    if(arr2[i] != n){
      console.log('数组不等');
      return 
    }
  })
  console.log("数组相等");
}
compare([1,2,3],[2,5,4]) // 不等


/**
 * 外部迭代器，将遍历权利转移外部，在调用时拥有更多自由性，缺点是调用方式复杂
*/

const iterator = function (arr) {  
  let current = 0
  const next = function () {  
    current = current + 1
  }
  const done = function () {  
    return  current >= arr.length
  }
  const value = function () {  
    return  arr[current]
  }
  return {
    next,
    done,
    value
  }
}

const arr1 = [1,2,3]
const arr2 = [1,2,3]
const iterator1 = iterator(arr1)
const iterator2 = iterator(arr2)

const compare = function (iterator1,iterator2) {  
  while (!iterator1.done() && !iterator2.done()){
    if (iterator1.value() !== iterator2.value()) {
      console.log('两数组不等');
      return 
    }
    iterator1.next()  //外部迭代器将遍历权利转移外部
    iterator2.next()
  }
  console.log('两数组相等');
}

compare(iterator1,iterator2);