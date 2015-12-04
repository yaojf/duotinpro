var db = require('../config/database');

var StaticPro = function () {
};

var tableName = 'duotin_static_properties';

StaticPro.prototype.getByFileId = function (fileId, callback) {
    var sql = "select * from " + tableName + " where file_id=? order by id asc";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [fileId], function (err, results) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                //返回用户id
                return callback(false, results);
            }
        });
    });
};

StaticPro.prototype.getByKey = function (fileId, name, callback) {
    var sql = "select * from " + tableName + " where file_id=? and name=?";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [fileId, name], function (err, results) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                //返回用户id
                if (results) {
                    return callback(false, results[0]);
                }
                else {
                    return callback(false, results);
                }
            }
        });
    });
};

StaticPro.prototype.updateById = function (id, value, callback) {
    var sql = "update " + tableName + " set value=?, updated_at=now() where id=?";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [value, id], function (err) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                return callback(false);
            }
        });
    });
};

StaticPro.prototype.save = function (fileId, name, value, callback) {
    var sql = "insert into " + tableName + " (name,value,file_id,created_at,updated_at) values(?,?,?,now(),now())";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name, value, fileId], function (err) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                return callback(false);
            }
        });
    });
};

StaticPro.prototype.deleteById = function (id, callback) {
    var sql = "delete from " + tableName + " where id=?";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function (err) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                return callback(false);
            }
        });
    });
};

StaticPro.prototype.deleteByFileId = function (fileId, callback) {
    var sql = "delete from " + tableName + " where file_id=?";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [fileId], function (err) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                return callback(false);
            }
        });
    });
};

StaticPro.prototype.getByFileIds = function (ids, callback) {
    var sql = "SELECT * FROM " + tableName + " where file_id in (" + ids + ")";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results);
            }
        });
    });
};


StaticPro.prototype.getById = function (id, callback) {
    var sql = "SELECT * FROM " + tableName + " where id = ?";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results[0]);
            }
        });
    });
};


StaticPro.prototype.updateKeyValueById = function (id, key, value, callback) {
    var sql = "update " + tableName + " set name=? , value=?, updated_at=now() where id=?";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [key, value, id], function (err) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                return callback(false);
            }
        });
    });
};


module.exports = StaticPro;