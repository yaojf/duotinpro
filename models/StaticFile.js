var db = require('../config/database');

var tableName = 'duotin_static_files';

var StaticFile = function (staticFile) {
    this.filename = staticFile.filename;
    this.env = staticFile.env;
};

var StaticFile = function () {
};

StaticFile.prototype.save = function (filename, env, callback) {
    var sql = "insert into " + tableName + " (`file_name`, `env`, `created_at`, `updated_at`) values(?,?,now(),now())";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [filename, env], function (err) {
            connection.release();
            if (err) {
                throw err;
            } else {
                //返回用户id
                return callback(err);
            }
        });
    });
};

StaticFile.prototype.allPage = function (callback) {
    var sql = "SELECT * FROM " + tableName + " where is_del=0 order by id desc";
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

StaticFile.prototype.getByFileName = function (filename, env, callback) {
    var sql = "SELECT * FROM " + tableName + " where file_name=? and env=? and is_del=0";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [filename, env], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
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

StaticFile.prototype.deleteById = function (id, callback) {
    var sql = "delete FROM " + tableName + " where id=?";
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
                throw err;
            } else {
                return callback(err);
            }
        });
    });
};

StaticFile.prototype.getByIds = function (ids, callback) {
    var sql = "SELECT * FROM " + tableName + " where id in (" + ids + ") order by id desc";
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

StaticFile.prototype.getWithoutIds = function (ids, env, callback) {
    var sql = "SELECT * FROM " + tableName + " where id not in (" + ids + ") and env=?";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [env], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results);
            }
        });
    });
};

StaticFile.prototype.getByEnv = function (env, callback) {
    var sql = "SELECT * FROM " + tableName + " where is_del=0 and env=? order by id desc";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [env], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results);
            }
        });
    });
};


StaticFile.prototype.getByFileNameLike = function (filename, env, callback) {
    var sql1 = "SELECT * FROM " + tableName + " where file_name like ? and env=? and is_del=0";
    var sql2 = "SELECT * FROM " + tableName + " where file_name like ? and is_del=0";
    var sql;
    filename = "%" + filename + "%";
    env == 'nil' ? sql = sql2 : sql = sql1;

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [filename, env], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results);
            }
        });
    });
};


module.exports = StaticFile;