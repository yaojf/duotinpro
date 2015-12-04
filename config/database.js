var mysql = require('mysql');
var config = require('./settings');

var pool = mysql.createPool(config.mysql_dev);

exports.pool = pool;