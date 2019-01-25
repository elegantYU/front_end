const mysql = require('mysql')
const mysqlConfig = require('xxx')
const pool = mysql.createPool(mysqlConfig)
//  express的mysql模块创建连接池的方法封装
const SqlFn = (sql, cb) => {
  return pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err
      cb(rows)
      connection.release()
    })
  })
}