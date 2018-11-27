/**
 * 
 * @param {Number} n 
 * @return {Number}
 * @function factorial(n) write by myselfss
 */
function factorial(n) {  
  if(n.constructor !== Number) return false;
  if (n === 0) {
    return n
  }else{
    let temp = 1;
    for (let i = 1; i < n+1; i++) {
      temp = i * temp
    }
    return temp
  }
}
factorial(6)

/**
 * 
 * @param {Number} n 
 * @return {Number}
 * Use recursive for factrial
 * Amazing!!!
 */
function factorialRecursive(n) {
  return n > 1 ? n * factorialRecursive(n - 1) : 1;
}
factorialRecursive(5)