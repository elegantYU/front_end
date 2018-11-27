/**
 * 
 * @param {Number} n
 * @function judgePrimeNum(n) 判断n是否是素数 
 */
function judgePrimeNum(n) {
  for (let i = 2; i < n; i++) {
    if(n % i === 0){
      return false
    }
  }
  return true
}
// console.log(judgePrimeNum(10));

function listPrimeNum(n) {
  let arr = [1]
  function private(n) {
    if(n == 1) return arr
    let f = true
    for (let i = 2; i < n; i++) {
      if(n % i === 0){
        f = false
      }
    }
    if(f) arr.push(n)
    return private(n-1)
  }
  private(n)
}
console.log(listPrimeNum(10));