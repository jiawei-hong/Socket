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
        console.log(result);
    })
}

function sqlPattern(sql, pattern) {
    connection.query(sql, pattern, (err, result) => {
        console.log(result);
    })
}

module.exports = {
    sqlQuery,
    sqlPattern
}