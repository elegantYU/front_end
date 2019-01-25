// 数字千分位转化
const thousand = num => {
  const res = num.toString().replace(/\d+/, n => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
      return $1 + ','
    })
  })
  return res
}

const thousand2 = num => {
  return num && num
          .toString()
          .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
            return $2 + ','
          })
}

// debounce 多次执行变为最后一次执行
const debounce = (func, wait = 500) => {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
