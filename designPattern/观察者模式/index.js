// ObserverList
function ObserverList() {
  this.observerList = []
}
ObserverList.prototype.add = function (obj) {  
  return this.observerList.push(obj)
}
ObserverList.prototype.count = function (obj) {  
  return this.observerList.length
}
ObserverList.prototype.get = function (index) {  
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[ index ]
  }
}
ObserverList.prototype.indexOf = function (obj, startIndex) {  
  var i = startIndex;
  while(i < this.observerList.length){
    if (this.observer[i] === obj) {
      return i
    }
    i++
  }
  return -1
}