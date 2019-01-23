// 
const thousand = num => {
  const res = num.toString().replace(/\d+/, n => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
      return $1 + ','
    })
  })
  return res
}