var db = require('../config/database');

var tableName = 'duotin_static_program';

var Program = function () {
};

Program.prototype.save = function (name, env, callback) {
    var sql = "insert into " + tableName + " (`program_name`, `env`, `created_at`, `updated_at`) values(?,?,now(),now())";

    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name, env], function (err) {
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

Program.prototype.getByName = function (name, env, callback) {
    var sql = "SELECT * FROM " + tableName + " where program_name=? and env=?";
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name, env], function (err, results) {
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

Program.prototype.getById = function (id, callback) {
    var sql = "SELECT * FROM " + tableName + " where id=?";
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

Program.prototype.allPage = function (callback) {
    var sql = "SELECT * FROM " + tableName + " order by id desc";
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

Program.prototype.deleteById = function (id, callback) {
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

Program.prototype.getByFileNameLike = function (name, env, callback) {
    var sql1 = "SELECT * FROM " + tableName + " where program_name like ? and env=?";
    var sql2 = "SELECT * FROM " + tableName + " where program_name like ?";
    var sql;
    name = "%" + name + "%";
    env == 'nil' ? sql = sql2 : sql = sql1;
    // get a connection from the pool
    db.pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name, env], function (err, results) {
            connection.release();
            if (err) {
                throw err;
            } else {
                return callback(false, results);
            }
        });
    });
};


module.exports = Program;