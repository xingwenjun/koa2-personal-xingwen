const mysql = require("sequelize")


//1.获取数据库连接对象
var connection = new mysql('LIVEDB','root','a14761',{
    host: 'localhost', //host
    dialect: 'mysql', //数据库类型
    pool: {
        acquire: 30000,
        idle: 10000
    },
    timezone: "+08:00"
});
module.exports = {connection}