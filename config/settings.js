module.exports = {
    mysql_dev: {
        host: '10.1.10.202',     //本地数据库
        port: '3306',
        user: 'duo113',          //数据库用户名
        password: 'helloduo',          //数据库密码
        database: 'matrix',  //数据库名称
        connectionLimit: 10,
        supportBigNumbers: true
    }
};