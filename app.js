var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('./router');
var op = require('openurl');
var sql = require('./sql');

app.use('/', router);

server.listen(8000, () => {
    console.log(`Server Started. http://localhost:8000`);
    op.open('http://localhost:8000');
});


io.on('connection', (res) => {
    res.on('addUser', (msg) => {
        console.log(`[ServerMessage]： ${msg} 登入`);
    });

    res.on('sendMessage', msg => {
        io.emit('sendMessage', msg);
    });

    res.on('register', msg => {
        const sqlString = 'INSERT INTO `member`(`m_name`, `m_account`, `m_password`) VALUES (?,?,?)';
        const sqlData = [msg.username, msg.account, msg.password];

        sql.sqlPattern(sqlString, sqlData, (err, result) => {
            if (err)
                console.log(`[ServerMessage]：${err}`);
            else
                return 'Create Success!';
        });
    });

    res.on('search', msg => {
        const sqlString = `select * from ${msg.data} where m_name = ? `;
        const sqlData = [msg.username];

        sql.sqlPattern(sqlString, sqlData, (err, result) => {
            if (err)
                console.log(`[ServerMessage]：${err}`);
            else
                return result;
        });
    });

    res.on('disconnect', () => {
        console.log('有人離開了~');
    });
});