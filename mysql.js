const mysql = require("mysql")


//1.获取数据库连接对象
var connection = mysql.createConnection({
    host: 'localhost', //host
    user: 'root', //数据库用户名
    password: 'Wang1995123.', //密码
    database: 'LIVEDB' //数据库名
});
connection.connect();

//2.执行sql语句
var sql = 'select * from t_message'; //sql语句
connection.query(sql, function(error, results, fields) {
    if (error) {
        throw error;
    }
    return results; //返回查询数据库的结果
})

//3.关闭连接
connection.end();