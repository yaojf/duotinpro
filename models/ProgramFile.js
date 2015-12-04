var db = require('../config/database');

var ProgramFile = function() {
};

var tableName = 'duotin_static_program_file';

ProgramFile.prototype.getByProgramId = function(programId, callback) {
    var sql = "select * from " + tableName + " where program_id=? order by id asc";

    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [programId], function(err, results) {
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

ProgramFile.prototype.getByKey = function(fileId, programId, callback) {
    var sql = "select * from " + tableName + " where program_id=? and file_id=?";

    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [programId, fileId], function(err, results) {
            connection.release();
            if (err) {
                callback(err);
                return;
            } else {
                //返回用户id
                if(results) {
                    return callback(false, results[0]);
                }
                else {
                    return callback(false, results);
                }
            }
        });
    });
};

ProgramFile.prototype.save = function(fileId, programId, callback) {
    var sql = "insert into " + tableName + " (program_id,file_id,created_at,updated_at) values(?,?,now(),now())";

    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [programId, fileId], function(err) {
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

ProgramFile.prototype.deleteByKey = function(programId, fileId, callback) {
    var sql = "delete from " + tableName + " where program_id=? and file_id=?";

    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [programId, fileId], function(err) {
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

module.exports = ProgramFile;