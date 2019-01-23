// 数组合并及去重 输出数组
//  -- 1 -- 利用对象属性唯一性去重
function uniqueArray1 (arr, ...other) {
  let arr = arr.concat(...other)
  let obj = {}
  let result = []

  arr.forEach(v => {
    obj[v] ? '' : obj[v] = true && result.push(v)
  })

  return result
}

function uniqueArray1_1 (arr, ...other) {
  let arr = arr.concat(...other)
  let obj = {}
  return arr.reduce((prev, next) => {
    obj[next] ? '' : obj[next] = true && prev.push(next)
    return prev
  }, [])
}

// -- 2 -- 数组去重
function uniqueArray2 (arr, ...other) {
  let arr = arr.concat(...other)
  let result = []

  arr.forEach((v, i) => {
    if (arr.indexOf(v) === i)
      result.push(v)
  })
  return result
}

//  es6 Map
function uniqueArray3 (arr, ...other) {
  let arr = arr.concat(...other)
  let map = new Map()

  arr.forEach(v => {
    if (!map.has(v)) {
      map.set(v, v)
    }
  })
  return [...map.values()]
}

function uniqueArray3_1 (arr, ...other) {
  let arr = arr.concat(...other)
  let result = [...new Set(arr)]
  return result
}