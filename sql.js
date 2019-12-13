var mysql = require('mysql');
var env = require('./env');

var connection = mysql.createConnection({
    host: env.HOST,
    user: env.USERNAME,
    password: env.PASSWORD,
    database: env.DATABASE
});

connection.connect();

function sqlQuery(sql) {
    connection.query(sql, (err, result) => {
        if (err)
            console.log(`[Server Message]：${err}`);
        else
            return result;
    })
}

function sqlPattern(sql, pattern) {
    connection.query(sql, pattern, (err, result) => {
        if (err)
            console.log(`[Server Message]：${err}`);
        else
            return 'Create Success';
    })
}

module.exports = {
    sqlQuery,
    sqlPattern
}