var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('./router');
var op = require('openurl');
var sql = require('./sql');

app.use(router, express.static('views/public'));

server.listen(8000, () => {
    console.log(`Server Started. http://localhost:8000`);
    // op.open('http://localhost:8000');
});


io.on('connection', res => {
    res.on('addUser', (msg) => {
        console.log(`[ServerMessage]： ${msg} 登入`);
    });

    res.on('register', msg => {
        const sqlString = 'INSERT INTO `member`(`m_name`, `m_account`, `m_password`) VALUES (?,?,?)';
        const sqlData = [msg.username, msg.account, msg.password];
        io.emit('register', sql.sqlPattern(sqlString, sqlData));
    });

    res.on('login', msg => {
        io.emit('login', msg);
    });

    res.on('disconnect', () => {
        console.log('有人離開了~');
    });
});