﻿var mysql = require('mysql');
var config = require('../Config');
var connectionPool = mysql.createPool(config.MySQL_Config);

exports.Query = function (sql, parm, callBack, tran) {
    var conn = connectionPool;
    if (tran != undefined)
        conn = tran;
    conn.query(sql, parm, function (err, results, fields) {
        if (err) {
            if (tran != undefined) {
                tran.rollback();
            }
            throw err;
        };
        if (callBack != undefined) {
            callBack(results);
        }
    });
};

exports.Execute = function (sql, parm, callBack, tran) {
    var conn = connectionPool;
    if (tran != undefined)
        conn = tran;
    conn.query(sql, parm, function (err, results) {
        if (err) {
            if (tran != undefined) {
                tran.rollback();
            }
            throw err;
        };
        if (callBack != undefined) {
            callBack(results);
        }
    });
}

exports.Transaction = function (SqlParmEntitys, callBack) {
    connectionPool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        conn.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            for (var i = 0; i < SqlParmEntitys.length; i++) {
                var temp = SqlParmEntitys[i];
                conn.query(temp, function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                });
            }
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                if (callBack != undefined) {
                    callBack();
                }
            });
        });
        conn.release();
    });
}

exports.getConnection = function (callBack) {
    connectionPool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        callBack(conn);
    });
}

//dbConn.getConnection(function (conn) {
//    conn.beginTransaction(function (err) {
//        var b = dbConn.Query("select  * from best4_ever.ClassMate LIMIT 0, 1", null, test, conn);
//        var c = dbConn.Execute("DELETE FROM best4_ever.ClassMate WHERE classmateid = 0", null, test, conn);
//    });
//    conn.release();
//});

